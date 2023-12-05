import { useEffect, useCallback, useRef } from "react";

type TimeOutCb = { cancel: () => void; reschedule: () => void };
function isTimeoutValid(timeout: number): boolean {
  return !isNaN(timeout) && timeout >= 0 && timeout !== Infinity;
}

/**
 * React hook for delaying calls with time.
 * returns callback to use for cancelling
 */
export const useTimeout = (callback: () => void, timeout: number = 0): TimeOutCb => {
  const timeoutIdRef = useRef<number | null>(null);

  const cancel = useCallback(() => {
    const timeoutId = timeoutIdRef.current;
    if (timeoutId) {
      timeoutIdRef.current = null;
      clearTimeout(timeoutId);
    }
  }, [timeoutIdRef]);

  const reschedule = useCallback(() => {
    cancel();
    timeoutIdRef.current = isTimeoutValid(timeout) ? window.setTimeout(callback, timeout) : null;
  }, [callback, timeout, cancel]);

  useEffect(() => {
    timeoutIdRef.current = isTimeoutValid(timeout) ? window.setTimeout(callback, timeout) : null;
    return cancel;
  }, [callback, timeout, cancel]);

  return { cancel, reschedule };
};
