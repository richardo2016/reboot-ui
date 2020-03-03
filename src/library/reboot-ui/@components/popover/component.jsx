import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import Poper from '../_helpers/popper';
import { rclassnames, tryUseRef } from '../../../../utils/react-like';
import { parsePlacement } from '../../utils/popper';
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
        const [fixedPlacement, setFixedPlacement] = React.useState(null)
        const pmInfo = parsePlacement(placement)
        
        fixupPoperOptions: {
            poperOptions = poperOptions || {};
            poperOptions.modifiers = [];

            poperOptions.modifiers.push({
                name: 'fixup-popover-arrow',
                options: {
                    fixup: ({ realPlacement }) => {
                        if (realPlacement === pmInfo.placement) return ;

                        setFixedPlacement(realPlacement)
                    }
                }
            })

            poperOptions.modifiers.push({
                name: 'offset',
                options: {
                    offset: ({ placement }) => {
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
            fromOptions: {
                direction: pmInfo.direction,
                placement: pmInfo.placement,
            },
            fromFixed: {
                ...pmInfo,
                ...fixedPlacement && parsePlacement(fixedPlacement)
            },
            arrowRef: React.useRef(null),
        }

        return (
            <PopverContext.Provider value={popoverCtx}>
                <Poper
                    {...props}
                    placement={popoverCtx.fromOptions.placement}
                    poperOptions={poperOptions}
                    overlayType={Popover.Overlay}
                    overlayPropNameForShow="isOpen"
                    overlayProps={{
                        as: Popover.Overlay
                    }}
                    overlayTransitionProps={{
                        transitionStateClass: {
                            entering: 'show',
                            entered: 'show',
                            exiting: 'show',
                            exited: ''
                        }
                    }}
                    dismissOnClickAway={dismissOnClickAway}
                    ref={ref}
                >
                    {children}
                </Poper>
            </PopverContext.Provider>
        )
    }
)

Popover.Overlay = React.forwardRef(
    ({
        children,
        as: _as = 'div',
        isOpen = false,
        ...props
    }, ref) => {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

        const popoverCtx = tryUseRef(PopverContext)

        return (
            <JSXEl
                {...props}
                ref={ref}
                className={rclassnames(props, [
                    isOpen && 'show',
                    'fade',
                    'popover',
                    popoverCtx.fromFixed.direction && `bs-popover-${popoverCtx.fromFixed.direction}`
                ])}
                {...popoverCtx.fromFixed.direction && {
                    'x-placement': popoverCtx.fromFixed.direction
                }}
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