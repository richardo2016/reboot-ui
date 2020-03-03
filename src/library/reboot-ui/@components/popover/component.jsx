import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import RbTransitionFade from '../_helpers/transition';
import Poper from '../_helpers/poper';
import { rclassnames, tryUseRef } from '../../../../utils/react-like';
import { parsePlacement } from '../../utils/poper';
import { coerceInteger } from '../../../../utils/coerce';

const PopverContext = React.createContext({
    arrowRef: null,
})

const DFLT_ARROW_OFFSET = 8

/**
 * @see https://getbootstrap.com/docs/4.4/components/navbar/#supported-content
 * 
 * @inner-content `.popover-header`
 * @inner-content `.popover-body`
 */
const Popover = React.forwardRef(
    ({
        children,
        /**
         * @description (default: right)
         */
        placement = 'right',
        poperOptions,
        dismissOnClickAway = true,
        ...props
    }, ref) => {
        const pmInfo = parsePlacement(placement)
        placement = pmInfo.placement
        
        fixupPoperOptions: {
            poperOptions = poperOptions || {};
            poperOptions.modifiers = poperOptions.modifiers || [];

            poperOptions.modifiers = poperOptions.modifiers.filter(x => x.name === 'arrow')
            poperOptions.modifiers.push({
                name: 'arrow',
                options: {},
            })

            poperOptions.modifiers = poperOptions.modifiers.filter(x => x.name === 'offset')
            poperOptions.modifiers.push({
                name: 'offset',
                options: {
                    offset: () => {
                        // default arrow size of bootstrap's popover
                        let offset = DFLT_ARROW_OFFSET
                        if (popoverCtx.arrowRef.current) {
                            const {height, width} = window.getComputedStyle(popoverCtx.arrowRef.current)
                            offset = Math.min(
                                coerceInteger(height),
                                coerceInteger(width)
                            )
                        }

                        return [0, offset];
                    },
                },
            })
        }

        const popoverCtx = {
            direction: pmInfo.direction,
            placement: pmInfo.placement,
            arrowRef: React.useRef(null)
        }

        return (
            <PopverContext.Provider value={popoverCtx}>
                <RbTransitionFade
                    {...props}
                    placement={placement}
                    poperOptions={poperOptions}
                    as={Poper}
                    ref={ref}
                    overlayType={Popover.Overlay}
                    dismissOnClickAway={dismissOnClickAway}
                >
                    {children}
                </RbTransitionFade>
            </PopverContext.Provider>
        )
    }
)

Popover.Overlay = React.forwardRef(
    ({
        children,
        as: _as = 'div',
        ...props
    }, ref) => {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

        const popoverCtx = tryUseRef(PopverContext)

        return (
            <JSXEl
                {...props}
                ref={ref}
                className={rclassnames(props, [
                    'popover',
                    `bs-popover-${popoverCtx.direction}`
                ])}
            >
                <div
                    ref={popoverCtx.arrowRef}
                    className="arrow"
                    data-popper-arrow
                />
                {children}
            </JSXEl>
        )
    }
)

Popover.Header = ({
    children,
    as: _as = 'div',
    ...props
}) => {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'popover-header'
            ])}
        >
            {children}
        </JSXEl>
    )
}

Popover.Body = ({
    children,
    as: _as = 'div',
    ...props
}) => {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'popover-body'
            ])}
        >
            {children}
        </JSXEl>
    )
}

export default Popover