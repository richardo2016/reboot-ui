import React from 'react'
import { getHTMLElementFromJSXElement } from '../react-like';

const noop: EventListenerOrEventListenerObject = () => void 0
export default function useHoveraway (
    hoveredElRef: React.MutableRefObject<HTMLElement | null>,
    {
        /**
         * @notice wrap it with `useCallback` recommended
         */
        onAway: handlerAway = noop,
        /**
         * @notice wrap it with `useCallback` recommended
         */
        onIn: handlerIn = noop,
    } = {}
) {
    React.useLayoutEffect(() => {
        const { current: hoveredRef } = hoveredElRef
        if (!hoveredRef) return ;

        const hoveredEl = getHTMLElementFromJSXElement(hoveredRef)

        hoveredEl.addEventListener('mouseenter', handlerIn)
        hoveredEl.addEventListener('mouseleave', handlerAway)

        return () => {
            hoveredEl.removeEventListener('mouseenter', handlerIn)
            hoveredEl.removeEventListener('mouseleave', handlerAway)
        }
    }, [hoveredElRef.current, handlerAway, handlerIn])
}