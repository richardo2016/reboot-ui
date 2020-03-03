import React from 'react'

function noop () {}
export default function useHoveraway (
    hoveredElRef,
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
    const handlerAway = React.useCallback(onAway);
    const handlerIn = React.useCallback(onIn);

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