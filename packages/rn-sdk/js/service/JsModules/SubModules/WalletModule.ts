import { SendResult, ViewResult } from '@portkey-wallet/contracts/types';
import { PortkeyModulesEntity } from '../../native-modules';
import { BaseJSModule, BaseMethodParams, BaseMethodResult } from '../types';
import { getContractInstance } from 'model/contract/handler';
import { isWalletUnlocked } from 'model/verify/after-verify';
import { getUnlockedWallet } from 'model/wallet';

const WalletModule: BaseJSModule = {
  callCaContractMethod: async (props: CallCaMethodProps) => {
    const { eventId, contractMethodName: methodName, params, isViewMethod } = props;
    console.log('callContractMethod called ', 'eventId: ', eventId, 'methodName: ', methodName, 'params: ', params);
    if (!(await isWalletUnlocked())) {
      return emitJSMethodResult(eventId, {
        status: 'fail',
        error: 'wallet is not unlocked',
      });
    }
    const contract = await getContractInstance();
    const { address } = await getUnlockedWallet();
    try {
      const result: ViewResult | SendResult = isViewMethod
        ? await contract.callSendMethod(methodName, address, params)
        : await contract.callViewMethod(methodName, params);
      if (!result) throw new Error('result is null');
      const { data, error } = result;
      let jsData: BaseMethodResult = {
        status: !error ? 'success' : 'fail',
        data,
        error,
      };
      if ((result as any).transactionId) {
        jsData = {
          ...jsData,
          transactionId: (result as any).transactionId,
        };
      }
      emitJSMethodResult(eventId, jsData);
    } catch (e) {
      emitJSMethodResult(eventId, {
        status: 'fail',
        error: e,
      });
    }
  },

  getWalletDetails: async (props: BaseMethodParams) => {
    const { eventId } = props;
    console.log('getWalletDetails called ', 'eventId: ', eventId);
    if (!(await isWalletUnlocked())) {
      return emitJSMethodResult(eventId, {
        status: 'fail',
        error: 'wallet is not unlocked!',
      });
    }
    const wallet = await getUnlockedWallet();
    return emitJSMethodResult(eventId, {
      status: 'success',
      data: wallet,
    });
  },
};

export const emitJSMethodResult = (eventId: string, result: BaseMethodResult) => {
  PortkeyModulesEntity.NativeWrapperModule.onWarning(
    'emitJSMethodResult',
    `emitJSMethodResult called, eventId: ${eventId}, result: ${JSON.stringify(result)}`,
  );
  PortkeyModulesEntity.NativeWrapperModule.emitJSMethodResult(eventId, JSON.stringify(result));
};

export interface CallCaMethodProps extends BaseMethodParams {
  contractMethodName: string;
  isViewMethod: boolean;
  params: { [key: string | symbol]: any };
}

export { WalletModule };
