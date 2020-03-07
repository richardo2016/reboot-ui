import React from 'react'

export function useTimeout (callback, time) {
    const savedCallback = React.useRef(callback);
    savedCallback.current = callback;

    React.useEffect(() => {
        if (time < 0 || typeof savedCallback.current !== 'function')
            return;
        
        const id = setTimeout(savedCallback.current, time);
        return () => clearTimeout(id);
    }, [time]);
};

export function useInterval(callback, interval) {
  const savedCallback = React.useRef(null);
  const timerRef = React.useRef(null)
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