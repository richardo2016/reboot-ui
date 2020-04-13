import React from 'react'
import { componentOrElementContains } from '../react-like';

type DocEle = Document | HTMLElement
const noop = (evt: MouseEvent) => void 0
export default function useClickaway (
    clkEleRef: React.MutableRefObject<HTMLElement | null>,
    getTerminalElement: (() => DocEle) | DocEle = document,
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
    } : {
        clickAway?: (evt: MouseEvent) => any
        clickIn?: (evt: MouseEvent) => any
        stopPropagation?: boolean
    } = {}
) {
    clickAway = React.useCallback(clickAway as any, []);
    clickIn = React.useCallback(clickIn as any, []);

    React.useLayoutEffect(() => {
        let bubleEl = typeof getTerminalElement === 'function' ? getTerminalElement() : getTerminalElement

        const handler: EventListenerOrEventListenerObject = (
            (evt) => {
                const el: any = evt.target

                let { current: clkEle } = clkEleRef;

                if (clkEle && componentOrElementContains(clkEle, el)) {
                    if (stopPropagation) evt.stopPropagation();

                    if (typeof clickIn === 'function')
                        clickIn(evt as MouseEvent);

                    return ;
                }

                if (typeof clickAway === 'function')
                    clickAway(evt as MouseEvent);
            }
        )
        bubleEl.addEventListener('click', handler)

        return () => {
            bubleEl.removeEventListener('click', handler)
        }
    }, [clkEleRef && clkEleRef.current, clickAway, clickIn])
}