import React from 'react'

export default function (
    clkEleRef,
    getTerminalElement = document,
    {
        /**
         * @notice wrap it with `useCallback` recommended
         */
        clickAway,
        /**
         * @notice wrap it with `useCallback` recommended
         */
        clickIn,
    } = {}
) {
    clickAway = React.useCallback(clickAway);
    clickIn = React.useCallback(clickIn);

    React.useLayoutEffect(() => {
        const bubleEl = typeof getTerminalElement === 'function' ? getTerminalElement() : getTerminalElement

        const handler = (
            (evt) => {
                const el = evt.target
                const { current: clkEle } = clkEleRef;
                
                if (clkEle && clkEle.contains(el)) {
                    evt.stopPropagation();

                    if (typeof clickIn === 'function')
                        clickIn(evt);

                    return ;
                }

                if (typeof clickAway === 'function')
                    clickAway(evt);
            }
        )
        bubleEl.addEventListener('click', handler)

        return () => {
            bubleEl.removeEventListener('click', handler)
        }
    }, [clkEleRef, clickAway, clickIn])
}