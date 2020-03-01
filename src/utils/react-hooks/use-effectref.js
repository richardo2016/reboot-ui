import React from 'react'

function noop () {}
export default function useEffectRef (
    /**
     * @notice wrap it with `useCallback` recommended
     */
    callback,
) {
    const disposeRef = React.useRef(noop);
    const effect = React.useCallback(
        element => {
            disposeRef.current();
            /**
             * @why call callback once only, so reset it after calling it.
             */
            disposeRef.current = noop;

            if (element) {
                const dispose = callback(element);

                if (typeof dispose === 'function')
                    disposeRef.current = dispose;
                else if (dispose !== undefined)
                    console.warn('[useEffectRef] Effect ref callback must return undefined or a dispose function');
            }
        },
        [callback]
    );

    return effect;
}