import React from 'react'

export function useTimeout (callback: Function, timeout: number) {
    const savedCallback = React.useRef(callback);
    savedCallback.current = callback;

    React.useEffect(() => {
        if (timeout < 0 || typeof savedCallback.current !== 'function')
            return;
        
        const id = setTimeout(savedCallback.current, timeout);
        return () => clearTimeout(id);
    }, [timeout]);
};

export function useInterval(callback: Function, interval: number) {
  const savedCallback = React.useRef<Function | null>(null);
  const timerRef = React.useRef<any | null>(null);
  const cleanIdRef = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      if (typeof savedCallback.current === 'function')
        savedCallback.current();
    }
    if (interval !== null) {
      cleanIdRef()
      const id = timerRef.current = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
}