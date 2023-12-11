import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import { LaunchModeSet, LaunchMode } from '@portkey/rn-sdk/src/global/init/entries';
import { EntryResult, PortkeyModulesEntity } from '@portkey/rn-sdk/src/service/native-modules';
import { GuardianVerifyConfig, GuardianVerifyType } from '@portkey/rn-sdk/src/model/verify/social-recovery';
import { NetworkController } from '@portkey/rn-sdk/src/network/controller';
import { parseGuardianInfo } from '@portkey/rn-sdk/src/model/global';
import { PortkeyConfig } from '@portkey/rn-sdk/src/global/constants';
import Loading from '@portkey/rn-sdk/src/components/Loading';
import { GuardiansApprovalIntent } from '@portkey/rn-sdk/src/pages/GuardianManage/GuardianHome';
import { GuardianApprovalPageProps, GuardianApprovalPageResult } from '@portkey/rn-sdk/src/pages/Entries/GuardianApproval';
import { VerifierDetailsPageProps, VerifierDetailsPageResult } from '@portkey/rn-sdk/src/pages/Entries/VerifierDetails';
import { getUnlockedWallet } from '@portkey/rn-sdk/src/model/wallet';
import { getOrReadCachedVerifierData } from '@portkey/rn-sdk/src/model/contract/handler';

export const navigateToForResult = async <P, R>(entryName: string, props: P, from = 'UNKNOWN'): Promise<R | null> => {
  return new Promise<R | null>((resolve, _) => {
    PortkeyModulesEntity.RouterModule.navigateToWithOptions<R, P>(
      entryName,
      LaunchModeSet.get(entryName) || LaunchMode.STANDARD,
      from,
      {
        params: props,
        closeCurrentScreen: false,
      },
      (result: EntryResult<R>) => {
        resolve(result.data ?? null);
      },
    );
  });
};

const returnToParticularBasePage = async (intent: GuardiansApprovalIntent) => {
  const { type } = intent;
  switch (type) {
    case GuardianVerifyType.CREATE_WALLET:
    case GuardianVerifyType.ADD_GUARDIAN:
    case GuardianVerifyType.MODIFY_GUARDIAN:
    case GuardianVerifyType.REMOVE_GUARDIAN:
      returnToGuardianHome(intent);
      break;
    case GuardianVerifyType.EDIT_PAYMENT_SECURITY:
      returnToPaymentSecurityDetail(intent);
      break;
  }
};

const returnToGuardianHome = async (intent: GuardiansApprovalIntent) => {
  PortkeyModulesEntity.RouterModule.navigateTo<GuardiansApprovalIntent>(
    PortkeyEntries.GUARDIAN_HOME_ENTRY,
    LaunchMode.SINGLE_TASK,
    `GuardianVerifyType#${intent.type}`,
    'none',
    false,
    intent,
  );
};

const returnToPaymentSecurityDetail = async (intent: GuardiansApprovalIntent) => {
  PortkeyModulesEntity.RouterModule.navigateBack({
    status: intent.result,
    data: intent,
  });
};

export const handlePhoneOrEmailGuardianVerify = async (config: VerifierDetailsPageProps) => {
  return navigateToForResult<VerifierDetailsPageProps, VerifierDetailsPageResult>(
    PortkeyEntries.VERIFIER_DETAIL_ENTRY,
    config,
  );
};

export const handleGuardiansApproval = async (config: GuardianVerifyConfig) => {
  if (!checkGuardiansApprovalConfig(config)) {
    throw new Error('invalid config, or this guardianVerifyType is not implemented yet.');
  }
  Loading.show();
  const chainId = await PortkeyConfig.currChainId();
  const { guardians, particularGuardian, failHandler, guardianVerifyType } = config;
  try {
    if (!(guardians?.length > 0)) {
      const {
        caInfo: { caHash },
      } = await getUnlockedWallet();
      const guardiansInfo = await NetworkController.getGuardianInfo('', caHash);
      const cachedVerifierData = Object.values((await getOrReadCachedVerifierData()).data?.verifierServers ?? {});
      const parsedGuardians = guardiansInfo?.guardianList?.guardians?.map(guardian => {
        return parseGuardianInfo(guardian, chainId, cachedVerifierData);
      });
      if (parsedGuardians?.length > 0) config.guardians = parsedGuardians;
    }
    if (guardianVerifyType !== GuardianVerifyType.MODIFY_GUARDIAN) {
      config.guardians = (config.guardians ?? [])?.filter(
        it =>
          !particularGuardian ||
          it.sendVerifyCodeParams.guardianIdentifier !== particularGuardian.sendVerifyCodeParams.guardianIdentifier ||
          it.sendVerifyCodeParams.verifierId !== particularGuardian.sendVerifyCodeParams.verifierId ||
          it.sendVerifyCodeParams.type !== particularGuardian.sendVerifyCodeParams.type,
      );
    }
  } catch (e) {
    console.error(e);
  }
  Loading.hide();
  const option = await navigateToForResult<GuardianApprovalPageProps, GuardianApprovalPageResult>(
    PortkeyEntries.GUARDIAN_APPROVAL_ENTRY,
    {
      deliveredGuardianListInfo: JSON.stringify(config),
    },
  );
  console.log('handleGuardiansApproval', option);
  Loading.hide();
  if (!option?.isVerified && failHandler) {
    failHandler();
  } else {
    returnToParticularBasePage({
      type: guardianVerifyType,
      result: option?.isVerified ? 'success' : 'fail',
    });
  }
};

const checkGuardiansApprovalConfig = (config: GuardianVerifyConfig): boolean => {
  const { guardianVerifyType, particularGuardian, paymentSecurityConfig } = config;
  console.log('checkGuardiansApprovalConfig', config);
  switch (guardianVerifyType) {
    case GuardianVerifyType.CREATE_WALLET: {
      return !particularGuardian;
    }
    case GuardianVerifyType.ADD_GUARDIAN:
    case GuardianVerifyType.MODIFY_GUARDIAN:
    case GuardianVerifyType.REMOVE_GUARDIAN: {
      return !!particularGuardian;
    }

    case GuardianVerifyType.EDIT_PAYMENT_SECURITY: {
      return !!paymentSecurityConfig;
    }
    default:
      return true;
  }
};
