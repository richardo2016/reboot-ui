import React from 'react'

const noop: EventListenerOrEventListenerObject = () => void 0
export default function useHoveraway (
    hoveredElRef: React.MutableRefObject<HTMLElement>,
    {
        /**
         * @notice wrap it with `useCallback` recommended
         */
        onAway = noop,
        /**
         * @notice wrap it with `useCallback` recommended
         */
        onIn = noop,
    } = {}
) {
    const handlerAway = React.useCallback(onAway as any, []);
    const handlerIn = React.useCallback(onIn as any, []);

    React.useLayoutEffect(() => {
        const { current: hoveredEl } = hoveredElRef
        if (!hoveredEl) return ;

        hoveredEl.addEventListener('mouseenter', handlerIn)
        hoveredEl.addEventListener('mouseleave', handlerAway)

        return () => {
            hoveredEl.removeEventListener('mouseenter', handlerIn)
            hoveredEl.removeEventListener('mouseleave', handlerAway)
        }
    }, [hoveredElRef.current, handlerAway, handlerIn])
}