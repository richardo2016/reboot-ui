import React from 'react'

export default function (
    hoveredElRef,
    getTerminalElement = document,
    {
        /**
         * @notice wrap it with `useCallback` recommended
         */
        onAway,
        /**
         * @notice wrap it with `useCallback` recommended
         */
        onIn,
    } = {}
) {
    const onHoverAway = React.useCallback(onAway);
    const onHoverIn = React.useCallback(onIn);

    React.useLayoutEffect(() => {
        const bubleEl = typeof getTerminalElement === 'function' ? getTerminalElement() : getTerminalElement

        const handlerAway = ((evt) => {
            if (typeof onHoverIn === 'function') onHoverIn(evt);
        })
        const handlerIn = ((evt) => {
            if (typeof onHoverAway === 'function') onHoverAway(evt);
        })
        bubleEl.addEventListener('mouseenter', handlerIn)
        bubleEl.addEventListener('mouseleave', handlerAway)

        return () => {
            bubleEl.removeEventListener('mouseenter', handlerIn)
            bubleEl.removeEventListener('mouseleave', handlerAway)
        }
    }, [hoveredElRef.current, onHoverAway, onHoverIn])
}