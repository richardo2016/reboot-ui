import React, { ReactNode, ReactNodeArray } from 'react'

import {
    resolveJSXElement,
    parseChildrenProp,
    isReactTypeOf,
    getHTMLElementFromJSXElement,
    filterPopperTrigger,
    useClickaway,
    useHoveraway,
    flatten,
    filterPlacement,
    RebootUI,
} from '@reboot-ui/common'

import { useFixupPopoverToken, createPopup, IPopperOptions, FixupPopoverModifierConfig } from './utils';

export { IPopperOptions, FixupPopoverModifierConfig };

type Popup = ReturnType<typeof createPopup>

function useLatestInstanceRef (): [
    React.MutableRefObject<RebootUI.Nilable<Popup>>,
    () => void
] {
    const popperRef = React.useRef<RebootUI.Nilable<Popup>>(null);

    const clean = () => {
        if (popperRef.current) popperRef.current.destroy();
    }

    return [popperRef, clean]
}

export { createPopup, useFixupPopoverToken }

const PopperProto = React.forwardRef(
    function ({
        children: childEles,
        as: _as = React.Fragment,
        disabled = false,
        /**
         * @see placment option.placement in popper.js
         */
        placement = 'bottom-start',
        popperOptions = {},
        overlayType = React.Fragment,
        overlayProps = {},
        overlay: overlayJsx = null,
        dismissOnClickAway = true,
        destroyOnUnmount = false,
        /**
         * @description specifiy the way popper show
         * @enum click
         */
        trigger = 'click',
        /**
         * @developer
         * @description how to compose all childList
         */
        compose = ({
            children,
            childList,
            restChildren,
            triggerRef,
            overlayRef,
            overlayElement,
            isShowPopup,
        }) => (
            <>
                {restChildren}
                {isShowPopup && overlayElement}
            </>
        ),
        ...props
    }: RebootUI.IComponentPropsWithChildren<{
        disabled?: boolean
        placement?: RebootUI.PlacementType
        popperOptions?: IPopperOptions
        overlayType?: RebootUI.IPropAs
        overlayProps?: React.Props<any>,
        overlay?: ReactNode,
        dismissOnClickAway?: boolean
        destroyOnUnmount?: boolean
        trigger?: 'hover' | 'click'
        compose?: (ctx: {
            children: ReactNode,
            childList: ReactNodeArray,
            restChildren: ReactNodeArray,
            triggerRef: RebootUI.ReactRef,
            overlayRef: RebootUI.ReactRef,
            overlayElement: React.ReactNode,
            isShowPopup: boolean,
        }) => React.ReactNode
    }>, wref: RebootUI.ReactRef) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
        trigger = filterPopperTrigger(trigger)

        const triggerElRef = React.useRef(null)
        const overlayElRef = React.useRef(null)

        const [laref, cleanLaref] = useLatestInstanceRef();

        const [isShowPopup, setIsShowPopup] = React.useState<boolean>(false);

        const { childNodeList } = parseChildrenProp((childEles as React.ReactElement))

        const children = flatten(childNodeList).filter(x => x)
        let restChildren = children

        get_trigger: {
            let triggerJsxElIdx = children.findIndex(child => child.props.poperTrigger)
            triggerJsxElIdx = triggerJsxElIdx > -1 ? triggerJsxElIdx : 0
            let triggerJsxEl = children[triggerJsxElIdx] || null
            if (triggerJsxEl) {
                triggerJsxEl = React.cloneElement(triggerJsxEl, {ref: triggerElRef})
                if (triggerJsxElIdx > -1) children[triggerJsxElIdx] = triggerJsxEl
            }
        }

        get_overlay: {
            let overlayJsxIdx = -1
            if (
                !overlayJsx
                && (
                    overlayJsxIdx = children.findIndex(child => isReactTypeOf(child, overlayType))
                ) > -1
            ) {
                overlayJsx = children[overlayJsxIdx]
            }
            if (overlayJsx) {
                overlayJsx = React.cloneElement(overlayJsx as React.ReactElement, { ref: overlayElRef })
                if (overlayJsxIdx > -1) children[overlayJsxIdx] = overlayJsx
            }
        }
        restChildren = children.filter(x =>(x !== overlayJsx))

        switch (trigger) {
            case 'click':
            default:
                useClickaway(triggerElRef, undefined, {
                    clickIn: (() => { setIsShowPopup(!isShowPopup) }),
                    clickAway: (nativeEvent: MouseEvent) => {
                        if (trigger === 'click' && !dismissOnClickAway) return ;
                        if (!isShowPopup) return ;
                        const clkAwayEl = nativeEvent.target

                        if (
                            clkAwayEl
                            && overlayElRef.current
                            && getHTMLElementFromJSXElement(overlayElRef.current)
                            && getHTMLElementFromJSXElement(overlayElRef.current).contains(clkAwayEl as Node)
                        ) return ;
                        
                        setIsShowPopup(false)
                    }
                })
                break
            case 'hover':
                useHoveraway(triggerElRef, {
                    onIn: () => setIsShowPopup(true),
                    onAway: () => {
                        setIsShowPopup(false);
                    },
                })
                break
        }

        React.useLayoutEffect(() => {
            if (!isShowPopup) return ;
            if (!triggerElRef.current) return ;
            if (!overlayElRef.current) return ;

            let overlayPlacement = placement
            /**
             * @TODO use breakPoint of bootstrap, resolve objective-type placement and use it.
             */
            if ((overlayJsx as React.ReactElement).props && typeof (overlayJsx as React.ReactElement).props.placement === 'string')
                overlayPlacement = filterPlacement((overlayJsx as React.ReactElement).props && (overlayJsx as React.ReactElement).props.placement)
            
            laref.current = createPopup(
                getHTMLElementFromJSXElement(triggerElRef.current),
                getHTMLElementFromJSXElement(overlayElRef.current),
                {
                    ...popperOptions,
                    placement: overlayPlacement,
                }
            )

            return () => {
                if (destroyOnUnmount) cleanLaref();
            }
        }, [isShowPopup])

        const composeCallback = React.useCallback(compose, [])

        return (
            <JSXEl
                {...props}
                ref={wref}
            >
                {composeCallback({
                    children: childEles,
                    childList: children,
                    restChildren,
                    triggerRef: triggerElRef,
                    overlayRef: overlayElRef,
                    overlayElement: overlayJsx,
                    isShowPopup,
                })}
            </JSXEl>
        )
    }
)

const Popper = function (props: RebootUI.IGetReactLikeComponentProps<typeof PopperProto>) {
    return <PopperProto {...props} />
}

export default Popper

Popper.createPopup = createPopup
Popper.useFixupPopoverToken = useFixupPopoverToken