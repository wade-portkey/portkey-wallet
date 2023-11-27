import { getUnlockedWallet } from 'model/wallet';
import { NetworkController } from 'network/controller';
import { TestCase } from 'service/JsModules/types';

export const NetworkTestCases: Array<TestCase> = [
  {
    describe: 'GetNetworkInfo',
    run: async testContext => {
      const it = await NetworkController.getNetworkInfo();
      testContext.assert(it.totalCount > 0, 'totalCount should be greater than 0');
    },
  },
  {
    describe: 'run GetTokenPrice well',
    run: async testContext => {
      const it = await NetworkController.checkELFTokenPrice();
      testContext.assert(!!it, 'it should not be falsy');
      testContext.log(it, 'getTokenPrice result');
    },
    ignoreReport: true,
  },
  {
    describe: 'run getTokenInfo well',
    run: async testContext => {
      const it = await NetworkController.searchTokenList();
      testContext.assert(!!it, 'it should not be falsy');
      testContext.log(it, 'getTokenInfo result');
    },
    ignoreReport: true,
  },
  {
    describe: 'call getHolderInfo method',
    run: async testContext => {
      const wallet = await getUnlockedWallet({ getMultiCaAddresses: true });
      testContext.assert(!!wallet, 'wallet should not be falsy');
      testContext.log(wallet, 'wallet');
    },
  },
  {
    describe: 'get account balance well',
    run: async testContext => {
      const wallet = await getUnlockedWallet({ getMultiCaAddresses: true });
      const it = await NetworkController.fetchUserTokenBalance({
        maxResultCount: 100,
        skipCount: 0,
        caAddressInfos: Object.entries(wallet.multiCaAddresses).map(([chainId, caAddress]) => ({
          chainId,
          caAddress,
        })),
      });
      testContext.assert(!!it, 'it should not be falsy');
      testContext.log(it, 'getAccountBalance result');
    },
  },
];
