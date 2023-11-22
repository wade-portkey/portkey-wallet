import { NetworkType } from '@portkey-wallet/types';
import { EndPoints, PortkeyConfig } from 'global/constants';

// eslint-disable-next-line @typescript-eslint/ban-types
export function myThrottle(fn: Function, delay: number) {
  let timer: NodeJS.Timeout | null;
  return function () {
    if (!timer) {
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments);
      timer = setTimeout(() => {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      }, delay);
    }
  };
}

export const doubleClick = (fun: (params: any) => void, params: any, interval = 200): void => {
  let isCalled = false;
  let timer: NodeJS.Timeout;
  if (!isCalled) {
    isCalled = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      isCalled = false;
    }, interval);
    return fun(params);
  }
};

export const checkIsSvgUrl = (imgUrl: string) => {
  return /.svg$/.test(imgUrl);
};

export const getCurrentNetwork = async (): Promise<NetworkType> => {
  return (await PortkeyConfig.endPointUrl()) === EndPoints.MAIN_NET ? 'MAIN' : 'TESTNET';
};
