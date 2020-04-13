import React from 'react'

import { Transition } from 'react-transition-group';
import Popper, { IPopperOptions, FixupPopoverModifierConfig } from '@reboot-ui/icomponent-popper';

import {
    resolveJSXElement,
    rclassnames,
    tryUseContext,
    parsePlacement,
    coerceInteger,
    TransitionTimeouts,
    RebootUI,
} from '@reboot-ui/common';

interface PopverContext {
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

const PopverContext = React.createContext<PopverContext>({
    arrowRef: null,
} as PopverContext)

const DFLT_ARROW_OFFSET = 8

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
    exited: { opacity: 0 },
    unmounted: {},
}
/**
 * @see https://getbootstrap.com/docs/4.4/components/navbar/#supported-content
 * 
 * @inner-content `.popover-header`
 * @inner-content `.popover-body`
 */
const PopoverProto = React.forwardRef(
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
    }: RebootUI.IComponentPropsWithChildren<{
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

            popperOptions.modifiers.push({
                name: 'offset',
                options: {
                    offset: ({
                        placement
                    }: {
                        placement: Required<IPopperOptions>['placement']
                    }) => {
                        // default arrow size of bootstrap's popover
                        let offset = DFLT_ARROW_OFFSET
                        if (popoverCtx.arrowRef && popoverCtx.arrowRef.current) {
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

        const popoverCtx: PopverContext = {
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
                <Popper
                    {...props}
                    children={children}
                    placement={popoverCtx.fromFixed.placement}
                    popperOptions={popperOptions}
                    overlayType={Popover.Overlay}
                    destroyOnUnmount={false}
                    dismissOnClickAway={dismissOnClickAway}
                    ref={ref}
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
                                            exit: TransitionTimeouts.Fade,
                                        }}
                                    >
                                        {(state) => {
                                            if (state === 'exited' && !isShowPopup) return ;
                                            
                                            return (
                                                React.cloneElement((overlayElement as React.ReactElement), {
                                                    className: rclassnames((overlayElement as React.ReactElement).props, [
                                                        transitionStateClass[state],
                                                    ]),
                                                    style: {
                                                        ...transitionStateStyle[state],
                                                        ...(overlayElement as React.ReactElement).props.style,
                                                    }
                                                })
                                            )
                                        }}
                                    </Transition>
                                )}
                            </>
                        )
                    }}
                />
            </PopverContext.Provider>
        )
    }
)

const Popover = (props: RebootUI.IGetReactLikeComponentProps<typeof PopoverProto>) => {
    return <PopoverProto {...props} />
}

Popover.Overlay = React.forwardRef(
    (
        {
            children,
            as: _as = 'div',
            ...props
        }: RebootUI.IComponentPropsWithChildren,
        ref
    ) => {
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
}: RebootUI.IComponentPropsWithChildren) => {
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
}: RebootUI.IComponentPropsWithChildren) => {
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