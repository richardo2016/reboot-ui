import React from 'react'

function noop (...args: any[]) {}
export default function useDefaultValue<T = any>(
  defaultValue: T,
  calback: (arg: T) => void = noop
) {
  const firstValRef = React.useRef<T>(defaultValue);

  React.useEffect(() => {
    calback(firstValRef.current)
  }, [firstValRef.current])
}