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
  },
  {
    describe: 'run getTokenInfo well',
    run: async testContext => {
      const it = await NetworkController.checkUserTokenAssets();
      testContext.assert(!!it, 'it should not be falsy');
      testContext.log(it, 'getTokenInfo result');
    },
  },
];
