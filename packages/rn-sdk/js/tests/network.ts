import { NetworkController } from 'network/controller';
import { TestCase, addTestCases } from 'service/JsModules/SubModules/TestModule';

export const addNetworkTestCases = () => {
  addTestCases(NetworkTestCases);
};

const NetworkTestCases: Array<TestCase> = [
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
      testContext.assert(it !== null, 'it should not be null');
      testContext.log(`it: ${JSON.stringify(it)}`);
    },
  },
  {
    describe: 'run getTokenInfo well',
    run: async testContext => {
      const it = await NetworkController.checkUserTokenAssets();
      testContext.assert(it !== null, 'it should not be null');
      testContext.log(`it: ${JSON.stringify(it)}`);
    },
  },
];
