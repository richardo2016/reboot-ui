import React from 'react'

function noop () {}
export default function useDefaultValue(defaultValue, calback = noop) {
  const firstValRef = React.useRef(defaultValue);

  React.useEffect(() => {
    calback(firstValRef.current)
  }, [firstValRef.current])
}