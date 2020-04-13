import React from 'react'
import { dedupe } from '../array'

import { RebootUI } from '../../';

function noop () {}
export default function useListenerDispose (
    elSelector: RebootUI.DOMSelector,
    event_name = 'click',
    /**
     * @notice wrap it with `useCallback` recommended
     */
    callback: RebootUI.DOMEventHandler = noop,
    deps: any[] = []
) {
    const elsRef = React.useRef<Array<Node> | null>(null)
    const assignElRef = () => {
        if (!elSelector) return ;
        if (typeof elSelector === 'string')
            elsRef.current = Array.from(document.querySelectorAll(elSelector))
        else
            elsRef.current = [elSelector]
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

        if (elsRef.current)
            elsRef.current.forEach((el) => {
            el.addEventListener(event_name, handler)
        })
        return () => { disposeHandler() }
    }, dedupe([...deps, elSelector]))
}