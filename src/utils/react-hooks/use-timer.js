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
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    if (interval !== null) {
      const id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
}