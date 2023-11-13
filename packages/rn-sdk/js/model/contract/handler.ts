import { getContractBasic } from '@portkey-wallet/contracts/utils';
import { ContractBasic } from '@portkey-wallet/contracts/utils/ContractBasic';
import { VerifierInfo } from '@portkey-wallet/types/verifier';
import { getCachedNetworkConfig } from 'model/chain';
import { isWalletUnlocked } from 'model/verify/after-verify';
import { getUnlockedWallet } from 'model/wallet';
import { AElfWeb3SDK } from 'network/dto/wallet';
import { addManager } from 'utils/wallet';

export const getContractInstance = async (): Promise<ContractBasic> => {
  const { privateKey } = (await getUnlockedWallet()) || {};
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
    caHash,
    address,
    managerAddress,
    extraData,
  });
};

export const callGetVerifiersMethod = async (): Promise<{
  data?: {
    verifierServers: { [key: string]: VerifierInfo };
  };
}> => {
  const contractInstance = await getContractInstance();
  return await contractInstance.callViewMethod('GetVerifierServers');
};
