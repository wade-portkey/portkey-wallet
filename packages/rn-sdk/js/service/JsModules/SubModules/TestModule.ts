import { addNetworkTestCases } from 'tests/network';
import { BaseJSModule, BaseMethodParams } from '../types';
import { emitJSMethodResult } from './WalletModule';

export const TestCases: Array<TestCase> = [];

export const addTestCases = (testCase: TestCase | Array<TestCase>) => {
  if (Array.isArray(testCase)) {
    TestCases.push(...testCase);
  } else {
    TestCases.push(testCase);
  }
};

if (__DEV__) {
  addNetworkTestCases();
}

export interface TestCase {
  run: (context: TestContext) => void | Promise<void>;
  describe: string;
}

export interface TestContext {
  log: (msg: string) => void;
  warn: (msg: string) => void;
  error: (msg: string, error?: any) => void;
  assert: (condition: boolean, msg: string) => void;
}

export type TestReport = {
  testAmount: number;
  testsAccepted: number;
  testsFailed: number;
  details: Array<{
    describe: string;
    logs: Array<{
      level: 'log' | 'warn' | 'error';
      msg: string;
    }>;
    status: 'success' | 'fail';
  }>;
};

export const testRunner = async (): Promise<TestReport> => {
  const testReport: TestReport = {
    testAmount: 0,
    testsAccepted: 0,
    testsFailed: 0,
    details: [],
  };
  const testServices: TestCase[] = TestCases;
  console.log('testServices amount : ', testServices.length);
  for (const testService of testServices) {
    const testContext: TestContext = {
      log: (msg: string) => {
        testReport.details[testReport.details.length - 1].logs.push({
          level: 'log',
          msg,
        });
      },
      warn: (msg: string) => {
        testReport.details[testReport.details.length - 1].logs.push({
          level: 'warn',
          msg,
        });
      },
      error: (msg: string, error?: any) => {
        testReport.details[testReport.details.length - 1].logs.push({
          level: 'error',
          msg,
        });
        if (error) {
          testReport.details[testReport.details.length - 1].logs.push({
            level: 'error',
            msg: error,
          });
        }
      },
      assert: (condition: boolean, msg: string) => {
        if (!condition) {
          testReport.details[testReport.details.length - 1].logs.push({
            level: 'error',
            msg,
          });
          throw new Error(msg);
        }
      },
    };
    testReport.details.push({
      describe: testService.describe,
      logs: [],
      status: 'success',
    });
    try {
      await testService.run(testContext);
      testReport.testsAccepted += 1;
    } catch (e) {
      testReport.testsFailed += 1;
      testReport.details[testReport.details.length - 1].status = 'fail';
    }
    testReport.testAmount += 1;
  }
  return testReport;
};

const TestModule: BaseJSModule = {
  runTestCases: async (props: BaseMethodParams) => {
    const { eventId } = props;
    console.log('runTestCases called ', 'eventId: ', eventId);
    const testReport = await testRunner();
    console.log('testReport : ', JSON.stringify(testReport));
    return emitJSMethodResult(eventId, {
      status: testReport.testAmount === testReport.testsAccepted ? 'success' : 'fail',
      data: testReport,
    });
  },
};

export { TestModule };
