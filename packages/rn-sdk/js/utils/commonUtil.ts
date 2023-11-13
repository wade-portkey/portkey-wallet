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
