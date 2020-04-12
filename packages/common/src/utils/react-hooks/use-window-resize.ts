import React from 'react'

export default function useWindowResize() {
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);
  
    const listener = React.useCallback(
      () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }, []
    );
  
    React.useEffect(() => {
      window.addEventListener('resize', listener);
      return () => {
        window.removeEventListener('resize', listener);
      };
    }, []);
  
    return {
      width,
      height
    };
  }