import React from 'react'
import { dedupe } from '../array'

function noop () {}
export default function useListenerDispose (
    elSelector,
    event_name = 'click',
    /**
     * @notice wrap it with `useCallback` recommended
     */
    callback = noop,
    deps = []
) {
    const elsRef = React.useRef(null)
    const assignElRef = () => {
        elsRef.current = document.querySelectorAll(elSelector)
    }
    const disposeHandler = () => {
        if (elsRef.current)
            elsRef.current.forEach(el => {
                el.removeEventListener(event_name, handler)
            })
    }
    const handler = callback

    React.useEffect(() => { assignElRef() }, [elSelector])

    React.useLayoutEffect(() => {
        if (!elsRef.current) assignElRef();

        elsRef.current.forEach((el) => {
            el.addEventListener(event_name, handler)
        })
        return () => { disposeHandler() }
    }, dedupe([...deps, elSelector]))
}