import React from 'react'

import { Transition } from 'react-transition-group';

import Popper, { IPopperOptions, FixupPopoverModifierConfig } from '@reboot-ui/icomponent-popper';

import {
    resolveJSXElement,
    rclassnames,
    tryUseContext,
    isReactTypeOf,
    parseChildrenProp,
    parsePlacement,
    TransitionTimeouts,
    RebootUI,
} from '@reboot-ui/common';

interface TooltipContextType {
    arrowRef: React.MutableRefObject<any> | null,
    useArrow: boolean
    fromOptions: {
        direction: RebootUI.DirectionType
        placement: RebootUI.PlacementType
        axis?: RebootUI.AxisType
    },
    fromFixed: {
        direction: RebootUI.DirectionType
        placement: RebootUI.PlacementType
        axis?: RebootUI.AxisType
    },
}

const TooltipContext = React.createContext<TooltipContextType>({
    fromOptions: {},
    fromFixed: {},
    useArrow: true,
    arrowRef: null,
} as TooltipContextType)

const transitionStateClass: { [k in RebootUI.TransitionStateNames]: string } = {
    entering: 'show',
    entered: 'show',
    exiting: '',
    exited: '',
    unmounted: '',
}

const transitionStateStyle: { [k in RebootUI.TransitionStateNames]: React.CSSProperties } = {
    entering: {},
    entered: {},
    exiting: {},
    exited: { opacity: 0, visibility: 'hidden' },
    unmounted: {},
}

/**
 * @see https://getbootstrap.com/docs/4.4/components/navbar/#supported-content
 * 
 * @inner-content `.tooltip`
 * @inner-content `.tooltip-inner`
 */
const TooltipProto = React.forwardRef(
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
    }: RebootUI.IComponentPropsWithChildren<{
        content?: React.ReactNode,
        placement?: RebootUI.PlacementType
        popperOptions?: IPopperOptions
        dismissOnClickAway?: boolean
        arrow?: boolean
    }>, ref) => {
        const [fixedPlacement, setFixedPlacement] = React.useState< RebootUI.Nilable<Required<IPopperOptions>['placement']> >(null)
        const pmInfo = parsePlacement(placement)
        
        fixupPopperOptions: {
            popperOptions = popperOptions || {};
            popperOptions.modifiers = popperOptions.modifiers || [];

            popperOptions.modifiers.push({
                name: Popper.useFixupPopoverToken('fixup-popper-placement'),
                options: {
                    fixup: ({ realPlacement }) => {
                        if (realPlacement === pmInfo.placement) return ;

                        setFixedPlacement(realPlacement)
                    }
                } as FixupPopoverModifierConfig
            })
        }

        const tooltipCtx: TooltipContextType = {
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

        let { childNodeList: children } = parseChildrenProp(childEles as React.ReactElement)
        children = children.filter(x => x)

        const contentRef = React.useRef(null)
        if (!isReactTypeOf(content, Tooltip.Overlay)) {
            content = <Tooltip.Overlay ref={contentRef}>{content}</Tooltip.Overlay>
        } else {
            content = React.cloneElement(content as React.ReactElement, { ref: contentRef })
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
                                                (overlayElement as React.ReactElement),
                                                {
                                                    className: rclassnames((overlayElement as React.ReactElement).props, [
                                                        transitionStateClass[state],
                                                    ]),
                                                    style: {
                                                        ...(overlayElement as React.ReactElement).props.style,
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

const Tooltip = (props: RebootUI.IGetReactLikeComponentProps<typeof TooltipProto>) => {
    return <TooltipProto {...props} />
}

Tooltip.Overlay = React.forwardRef(
    ({
        children,
        as: _as = 'div',
        ...props
    }: RebootUI.IComponentPropsWithChildren, ref) => {
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