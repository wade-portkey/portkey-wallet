import { getContractBasic } from '@portkey-wallet/contracts/utils';
import { ContractBasic } from '@portkey-wallet/contracts/utils/ContractBasic';
import { handleVerificationDoc } from '@portkey-wallet/utils/guardian';
import { PortkeyConfig } from 'global/constants';
import { getCachedNetworkConfig } from 'model/chain';
import { guardianTypeStrToEnum } from 'model/global';
import { isWalletUnlocked } from 'model/verify/after-verify';
import { GuardianConfig } from 'model/verify/guardian';
import { getUnlockedWallet } from 'model/wallet';
import { AElfWeb3SDK, ApprovedGuardianInfo } from 'network/dto/wallet';
import { TempStorage } from 'service/storage';
import { addManager } from 'utils/wallet';

export interface Verifier {
  id: string;
  name: string;
  imageUrl: string;
}

export const getContractInstance = async (allowTemplateWallet = false): Promise<ContractBasic> => {
  let privateKey = '';
  if (allowTemplateWallet && !(await isWalletUnlocked())) {
    privateKey = '6167c717e781099c8ee77cbf0c3f6e7c8315fc581eb7daa891c872c026359c84';
  } else {
    const { privateKey: pk } = (await getUnlockedWallet()) || {};
    privateKey = pk;
  }
  const { caContractAddress, peerUrl } = (await getCachedNetworkConfig()) || {};
  return await getContractBasic({
    contractAddress: caContractAddress,
    rpcUrl: peerUrl,
    account: AElfWeb3SDK.getWalletByPrivateKey(privateKey),
  });
};

export const callAddManagerMethod = async (extraData: string, managerAddress: string) => {
  if (!(await isWalletUnlocked())) throw new Error('wallet is not unlocked');
  const contractInstance = await getContractInstance();
  const { address } = (await getUnlockedWallet()) || {};
  const {
    caInfo: { caHash },
  } = (await getUnlockedWallet()) || {};
  return await addManager({
    contract: contractInstance,
    address,
    caHash,
    managerAddress,
    extraData,
  });
};

export const getOrReadCachedVerifierData = async (): Promise<{
  data?: {
    verifierServers: {
      [key: string | number]: Verifier;
    };
  };
}> => {
  const GET_VERIFIERS_METHOD = 'GetVerifierServers';
  const chainId = await PortkeyConfig.currChainId();
  const endPoint = await PortkeyConfig.endPointUrl();
  const cached = await TempStorage.getString(`${GET_VERIFIERS_METHOD}_${chainId}_${endPoint}`);
  if (cached) return JSON.parse(cached);
  const contractInstance = await getContractInstance(true);
  const result = await contractInstance.callViewMethod('GetVerifierServers');
  result && TempStorage.set(`${GET_VERIFIERS_METHOD}_${chainId}_${endPoint}`, JSON.stringify(result));
  return result;
};

export const callAddGuardianMethod = async (
  particularGuardian: GuardianConfig,
  guardianList: Array<ApprovedGuardianInfo>,
) => {
  const contractInstance = await getContractInstance();
  const {
    address,
    caInfo: { caHash },
  } = (await getUnlockedWallet()) || {};
  return await contractInstance.callSendMethod('AddGuardian', address, {
    caHash,
    guardianToAdd: parseGuardianConfigInfoToCaType(particularGuardian),
    guardiansApproved: guardianList.map(item => parseVerifiedGuardianInfoToCaType(item)),
  });
};

export const callRemoveGuardianMethod = async (
  particularGuardian: GuardianConfig,
  guardianList: Array<ApprovedGuardianInfo>,
) => {
  const contractInstance = await getContractInstance();
  const {
    address,
    caInfo: { caHash },
  } = (await getUnlockedWallet()) || {};
  return await contractInstance.callSendMethod('RemoveGuardian', address, {
    caHash,
    guardianToRemove: parseGuardianConfigInfoToCaType(particularGuardian, true),
    guardiansApproved: guardianList.map(item => parseVerifiedGuardianInfoToCaType(item)),
  });
};

export const callEditGuardianMethod = async (
  thisGuardian: GuardianConfig,
  pastGuardian: GuardianConfig,
  guardianList: Array<ApprovedGuardianInfo>,
) => {
  const contractInstance = await getContractInstance();
  const {
    address,
    caInfo: { caHash },
  } = (await getUnlockedWallet()) || {};
  return await contractInstance.callSendMethod('UpdateGuardian', address, {
    caHash,
    guardianToUpdatePre: parseGuardianConfigInfoToCaType(pastGuardian, true),
    guardianToUpdateNew: parseGuardianConfigInfoToCaType(thisGuardian, true),
    guardiansApproved: guardianList.map(item => parseVerifiedGuardianInfoToCaType(item)),
  });
};

export const callCancelLoginGuardianMethod = async (particularGuardian: GuardianConfig) => {
  const contractInstance = await getContractInstance();
  const { guardianIdentifier } = handleVerificationDoc(particularGuardian.verifiedDoc?.verificationDoc ?? '');
  const {
    address,
    caInfo: { caHash },
  } = (await getUnlockedWallet()) || {};
  return contractInstance.callSendMethod('UnsetGuardianForLogin', address, {
    caHash,
    guardian: {
      type: guardianTypeStrToEnum(particularGuardian.sendVerifyCodeParams.type),
      verifierId: particularGuardian.sendVerifyCodeParams.verifierId,
      identifierHash: guardianIdentifier,
    },
  });
};

const parseGuardianConfigInfoToCaType = (guardianConfig: GuardianConfig, withoutVerifyData = false) => {
  const { signature, verificationDoc } = guardianConfig.verifiedDoc || {};
  if (!withoutVerifyData && (!signature || !verificationDoc))
    throw new Error('parseGuardianConfigInfoToCaType:verify data is invalid! ' + JSON.stringify(guardianConfig));
  const identifierHash = withoutVerifyData
    ? guardianConfig.identifierHash
    : handleVerificationDoc(guardianConfig.verifiedDoc?.verificationDoc ?? '')?.guardianIdentifier;
  return {
    identifierHash,
    type: guardianTypeStrToEnum(guardianConfig.sendVerifyCodeParams.type),
    verificationInfo: withoutVerifyData
      ? {
          id: guardianConfig.sendVerifyCodeParams?.verifierId,
        }
      : {
          id: guardianConfig.sendVerifyCodeParams.verifierId,
          signature: Object.values(Buffer.from(signature as any, 'hex')),
          verificationDoc,
        },
  };
};

const parseVerifiedGuardianInfoToCaType = (guardianConfig: ApprovedGuardianInfo) => {
  const { guardianIdentifier } = handleVerificationDoc(guardianConfig?.verificationDoc ?? '');
  const { signature, verificationDoc } = guardianConfig || {};
  if (!signature || !verificationDoc)
    throw new Error('parseVerifiedGuardianInfoToCaType:verify data is invalid! ' + JSON.stringify(guardianConfig));
  return {
    identifierHash: guardianIdentifier,
    type: guardianConfig.type,
    verificationInfo: {
      id: guardianConfig.verifierId,
      signature: Object.values(Buffer.from(signature as any, 'hex')),
      verificationDoc,
    },
  };
};
