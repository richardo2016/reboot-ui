import React from 'react'

import { Transition } from 'react-transition-group';

import { resolveJSXElement } from '@reboot-ui/common';
import Popper from '@reboot-ui/icomponent-popper';
import { rclassnames, tryUseContext, isReactTypeOf, parseChildrenProp } from '@reboot-ui/common';
import { parsePlacement } from '@reboot-ui/common';
import { TransitionTimeouts } from '@reboot-ui/common';

const TooltipContext = React.createContext({
    fromOptions: {},
    fromFixed: {},
    useArrow: true,
    arrowRef: null,
})

const transitionStateClass = {
    entering: 'show',
    entered: 'show',
    exiting: '',
    exited: ''
}

const transitionStateStyle = {
    exiting: {},
    exited: { opacity: 0, visibility: 'hidden' },
}

/**
 * @see https://getbootstrap.com/docs/4.4/components/navbar/#supported-content
 * 
 * @inner-content `.tooltip`
 * @inner-content `.tooltip-inner`
 */
const Tooltip = React.forwardRef(
    ({
        children: childEles,
        content = React.Fragment,
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
                name: Popper.useFixupPopoverToken('fixup-popper-placement'),
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

        let { childNodeList: children } = parseChildrenProp(childEles)
        children = children.filter(x => x)

        const contentRef = React.useRef(null)
        if (!isReactTypeOf(content, Tooltip.Overlay)) {
            content = <Tooltip.Overlay ref={contentRef}>{content}</Tooltip.Overlay>
        } else {
            content = React.cloneElement(content, { ref: contentRef })
        }

        return (
            <TooltipContext.Provider value={tooltipCtx}>
                <Popper
                    trigger={'hover'}
                    {...props}
                    children={children}
                    placement={tooltipCtx.fromFixed.placement}
                    popperOptions={popperOptions}
                    overlayType={Tooltip.Overlay}
                    destroyOnUnmount={false}
                    overlay={content}
                    compose={({
                        restChildren,
                        overlayElement,
                        isShowPopup,
                    }) => {
                        return (
                            <>
                                {restChildren}
                                {(
                                    <Transition
                                        in={isShowPopup}
                                        timeout={{
                                            enter: TransitionTimeouts.Fade,
                                            exit: TransitionTimeouts.Fade
                                        }}
                                    >
                                        {(state) => {
                                            if (state === 'exited' && !isShowPopup) return ;

                                            return React.cloneElement(
                                                overlayElement,
                                                {
                                                    className: rclassnames(overlayElement.props, [
                                                        transitionStateClass[state],
                                                    ]),
                                                    style: {
                                                        ...overlayElement.props.style,
                                                        ...transitionStateStyle[state],
                                                    }
                                                }
                                            )
                                        }}
                                    </Transition>
                                )}
                            </>
                        )
                    }}
                    dismissOnClickAway={false}
                    ref={ref}
                />
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