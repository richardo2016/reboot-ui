import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import Poper from '../_helpers/popper';
import { rclassnames, tryUseContext } from '../../../../utils/react-like';
import { parsePlacement } from '../../utils/popper';
import { coerceInteger } from '../../../../utils/coerce';
import { TransitionTimeouts } from '../common';

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
        popperOptions,
        dismissOnClickAway = true,
        arrow = true,
        ...props
    }, ref) => {
        const [fixedPlacement, setFixedPlacement] = React.useState(null)
        const pmInfo = parsePlacement(placement)
        
        fixupPopperOptions: {
            popperOptions = popperOptions || {};
            popperOptions.modifiers = [];

            popperOptions.modifiers.push({
                name: 'fixup-popper-placement',
                options: {
                    fixup: ({ realPlacement }) => {
                        if (realPlacement === pmInfo.placement) return ;

                        setFixedPlacement(realPlacement)
                    }
                }
            })

            popperOptions.modifiers.push({
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
            useArrow: !!arrow,
            arrowRef: React.useRef(null),
        }

        return (
            <PopverContext.Provider value={popoverCtx}>
                <Poper
                    {...props}
                    placement={popoverCtx.fromOptions.placement}
                    popperOptions={popperOptions}
                    overlayType={Popover.Overlay}
                    migrateOverlayChildrenToTransition
                    overlayProps={{
                        as: Popover.Overlay,
                        transitionProps: {
                            duration: {
                                enter: TransitionTimeouts.Fade,
                                exit: TransitionTimeouts.Fade
                            },
                            transitionStateClass: {
                                entering: 'show',
                                entered: 'show',
                                exiting: '',
                                exited: ''
                            },
                            transitionStateStyle: {
                                exiting: {},
                                exited: { opacity: 0 },
                            },
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
        ...props
    }, ref) => {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

        const popoverCtx = tryUseContext(PopverContext)

        return (
            <JSXEl
                {...props}
                ref={ref}
                className={rclassnames(props, [
                    'fade',
                    'popover',
                    popoverCtx.fromFixed.direction && `bs-popover-${popoverCtx.fromFixed.direction}`
                ])}
                {...popoverCtx.fromFixed.direction && {
                    'x-placement': popoverCtx.fromFixed.direction
                }}
            >
                {popoverCtx.useArrow && (
                    <div
                        ref={popoverCtx.arrowRef}
                        className="arrow"
                        data-popper-arrow
                    />
                )}
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