import { DependencyList, useRef, useCallback, useMemo } from 'react';
import { useLatestRef } from '.';

const useInterval = (callback: () => void, delay?: number | null, deps?: DependencyList) => {
  const intervalRef = useRef<NodeJS.Timer | number>();
  const savedCallback = useLatestRef(callback);
  const startInterval = useCallback(() => {
    if (!delay) return;
    intervalRef.current && clearInterval(intervalRef.current);
    savedCallback.current?.();
    intervalRef.current = setInterval(() => savedCallback.current?.(), delay || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...(deps || [])]);

  return useMemo(
    () => ({
      start: startInterval,
      remove: () => {
        intervalRef.current && clearInterval(intervalRef.current);
      },
    }),
    [startInterval],
  );
};

export default useInterval;
