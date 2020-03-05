import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import Poper from '../_helpers/popper';
import { rclassnames, tryUseContext, isReactTypeOf } from '../../../../utils/react-like';
import { parsePlacement } from '../../utils/popper';
import { arraify } from '../../../../utils/array';
import { TransitionTimeouts } from '../common';
import { useFixupPopoverToken } from '../_utils/popper';

const TooltipContext = React.createContext({
    arrowRef: null,
})

/**
 * @see https://getbootstrap.com/docs/4.4/components/navbar/#supported-content
 * 
 * @inner-content `.tooltip`
 * @inner-content `.tooltip-inner`
 */
const Tooltip = React.forwardRef(
    ({
        children,
        content,
        /**
         * @description (default: top)
         */
        placement = 'top',
        popperOptions,
        arrow = true,
        ...props
    }, ref) => {
        const [fixedPlacement, setFixedPlacement] = React.useState(null)
        const pmInfo = parsePlacement(placement)
        
        fixupPopperOptions: {
            popperOptions = popperOptions || {};
            popperOptions.modifiers = [];

            popperOptions.modifiers.push({
                name: useFixupPopoverToken('fixup-popper-placement'),
                options: {
                    fixup: ({ realPlacement }) => {
                        if (realPlacement === pmInfo.placement) return ;

                        setFixedPlacement(realPlacement)
                    }
                }
            })
        }

        const tooltipCtx = {
            fromOptions: {
                direction: pmInfo.direction,
                placement: pmInfo.placement,
            },
            fromFixed: {
                ...pmInfo,
                ...fixedPlacement && parsePlacement(fixedPlacement)
            },
            useArrow: arrow,
            arrowRef: React.useRef(null),
        }

        children = arraify(children)
        content = content || content.find(item => isReactTypeOf(item, Tooltip.Overlay))
        content = !isReactTypeOf(content, Tooltip.Overlay) ? (
            <Tooltip.Overlay>{content}</Tooltip.Overlay>
        ) : content
        children.push(content)

        return (
            <TooltipContext.Provider value={tooltipCtx}>
                <Poper
                    trigger={'hover'}
                    {...props}
                    placement={tooltipCtx.fromOptions.placement}
                    popperOptions={popperOptions}
                    overlayType={Tooltip.Overlay}
                    migrateOverlayChildrenToTransition
                    destroyOnUnmount={false}
                    alwayRenderTransitionChildren={true}
                    overlayProps={{
                        as: Tooltip.Overlay,
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
                                exited: { opacity: 0, visibility: 'hidden' },
                            },
                        }
                    }}
                    dismissOnClickAway={false}
                    ref={ref}
                >
                    {children}
                </Poper>
            </TooltipContext.Provider>
        )
    }
)

Tooltip.Overlay = React.forwardRef(
    ({
        children,
        as: _as = 'div',
        ...props
    }, ref) => {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

        const tooltipCtx = tryUseContext(TooltipContext)

        return (
            <JSXEl
                role="tooltip"
                {...props}
                ref={ref}
                className={rclassnames(props, [
                    'fade',
                    'tooltip',
                    tooltipCtx.fromFixed.direction && `bs-tooltip-${tooltipCtx.fromFixed.direction}`
                ])}
                {...tooltipCtx.fromFixed.direction && {
                    'x-placement': tooltipCtx.fromFixed.direction
                }}
            >
                {tooltipCtx.useArrow && (
                    <div
                        ref={tooltipCtx.arrowRef}
                        className="arrow"
                        data-popper-arrow
                    />
                )}
                <div className="tooltip-inner">
                    {children}
                </div>
            </JSXEl>
        )
    }
)

export default Tooltip