import React from 'react'
import { componentOrElementContains, getHTMLElementFromJSXElement } from '../react-like';

function noop () {}
export default function useClickaway (
    clkEleRef,
    getTerminalElement = document,
    {
        /**
         * @notice wrap it with `useCallback` recommended
         */
        clickAway = noop,
        /**
         * @notice wrap it with `useCallback` recommended
         */
        clickIn = noop,
        /**
         * @description stop propagation when click in
         */
        stopPropagation = false,
    } = {}
) {
    clickAway = React.useCallback(clickAway);
    clickIn = React.useCallback(clickIn);

    React.useLayoutEffect(() => {
        let bubleEl = typeof getTerminalElement === 'function' ? getTerminalElement() : getTerminalElement

        const handler = (
            (evt) => {
                const el = evt.target

                let { current: clkEle } = clkEleRef;

                if (clkEle && componentOrElementContains(clkEle, el)) {
                    if (stopPropagation) evt.stopPropagation();

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
    }, [clkEleRef && clkEleRef.current, clickAway, clickIn])
}