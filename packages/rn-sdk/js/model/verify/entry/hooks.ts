import { PortkeyEntries } from 'config/entries';
import { LaunchModeSet, LaunchMode } from 'global/init/entries';
import { EntryResult, PortkeyModulesEntity } from 'service/native-modules';
import { GuardianVerifyConfig, GuardianVerifyType } from '../social-recovery';
import { NetworkController } from 'network/controller';
import { parseGuardianInfo } from 'model/global';
import { PortkeyConfig } from 'global/constants';
import Loading from 'components/Loading';
import { OnGuardianHomeNewIntent } from 'pages/GuardianManage/GuardianHome';
import { GuardianApprovalPageProps, GuardianApprovalPageResult } from 'pages/entries/GuardianApproval';
import { VerifierDetailsPageProps, VerifierDetailsPageResult } from 'pages/entries/VerifierDetails';

const navigateToForResult = async <P, R>(entryName: string, props: P, from = 'UNKNOWN'): Promise<R | null> => {
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

const returnToGuardianHome = async (intent: OnGuardianHomeNewIntent) => {
  PortkeyModulesEntity.RouterModule.navigateTo<OnGuardianHomeNewIntent>(
    PortkeyEntries.GUARDIAN_HOME_ENTRY,
    LaunchMode.SINGLE_TASK,
    `GuardianVerifyType#${intent.type}`,
    'none',
    false,
    intent,
  );
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
  const { guardians, particularGuardian } = config;
  try {
    if (!(guardians?.length > 0)) {
      const guardiansInfo = await NetworkController.getGuardianInfo(config.accountIdentifier);
      const parsedGuardians = guardiansInfo?.guardianList?.guardians?.map(guardian => {
        return parseGuardianInfo(guardian, chainId);
      });
      if (parsedGuardians?.length > 0) config.guardians = parsedGuardians;
    }
    config.guardians = (config.guardians ?? [])?.filter(
      it =>
        !particularGuardian ||
        (it.sendVerifyCodeParams.guardianIdentifier !== particularGuardian.sendVerifyCodeParams.guardianIdentifier &&
          it.sendVerifyCodeParams.verifierId !== particularGuardian.sendVerifyCodeParams.verifierId &&
          it.sendVerifyCodeParams.type !== particularGuardian.sendVerifyCodeParams.type),
    );
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
  returnToGuardianHome({
    type: GuardianVerifyType.ADD_GUARDIAN,
    result: option ? 'success' : 'fail',
  });
};

const checkGuardiansApprovalConfig = (config: GuardianVerifyConfig): boolean => {
  const { guardianVerifyType, particularGuardian } = config;
  console.log('checkGuardiansApprovalConfig', config);
  switch (guardianVerifyType) {
    case GuardianVerifyType.CREATE_WALLET: {
      return !particularGuardian;
    }
    case GuardianVerifyType.ADD_GUARDIAN: {
      return true;
    }
    default:
      return false;
  }
};
