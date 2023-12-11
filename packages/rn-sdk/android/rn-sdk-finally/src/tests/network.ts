import { getUnlockedWallet } from '@portkey/rn-sdk/src/model/wallet';
import { NetworkController } from '@portkey/rn-sdk/src/network/controller';
import { TestCase } from '@portkey/rn-sdk/src/service/JsModules/types';
import { encryptLocal } from '@portkey/rn-sdk/src/utils/crypto';

export const NetworkTestCases: Array<TestCase> = [
  {
    describe: 'GetNetworkInfo',
    run: async testContext => {
      const it = await NetworkController.getNetworkInfo();
      testContext.assert(it.totalCount > 0, 'totalCount should be greater than 0');
    },
  },
  {
    describe: 'EncryptLocal',
    run: async testContext => {
      const msg = 'i-am-error';
      const decrypted = await encryptLocal(await encryptLocal(msg));
      console.log('decrypted', decrypted);
      testContext.assert(msg === decrypted, 'msg should be the same after 2 times encryptLocal');
    },
  },
  {
    describe: 'run GetTokenPrice well',
    run: async testContext => {
      const it = await NetworkController.checkELFTokenPrice();
      testContext.assert(!!it, 'it should not be falsy');
      testContext.log(it, 'getTokenPrice result');
    },
  },
  {
    describe: 'run getTokenInfo well',
    run: async testContext => {
      const it = await NetworkController.searchTokenList();
      testContext.assert(!!it, 'it should not be falsy');
      testContext.log(it, 'getTokenInfo result');
    },
  },
  {
    describe: 'get multi ca addresses well',
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
  {
    describe: 'get nft collections well',
    run: async testContext => {
      const wallet = await getUnlockedWallet({ getMultiCaAddresses: true });
      const it = await NetworkController.fetchNetCollections({
        maxResultCount: 100,
        skipCount: 0,
        caAddressInfos: Object.entries(wallet.multiCaAddresses).map(([chainId, caAddress]) => ({
          chainId,
          caAddress,
        })),
      });
      testContext.assert(!!it, 'it should not be falsy');
      testContext.log(it, 'getNftCollections result');
      const symbol = it.data[0]?.symbol;
      if (symbol) {
        const them = await NetworkController.fetchParticularNftItemList({
          maxResultCount: 100,
          skipCount: 0,
          symbol,
          caAddressInfos: Object.entries(wallet.multiCaAddresses).map(([chainId, caAddress]) => ({
            chainId,
            caAddress,
          })),
        });
        testContext.assert(!!them, 'nft items info should not be falsy');
        testContext.log(them, 'getNftItems result');
      }
    },
    useDetailsReport: true,
  },
];
