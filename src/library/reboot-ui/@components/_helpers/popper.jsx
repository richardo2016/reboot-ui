import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { parseChildrenProp, isReactTypeOf, getHTMLElementFromJSXElement } from '../../../../utils/react-like';
import useClickaway from '../../../../utils/react-hooks/use-clickaway';
import useHoveraway from '../../../../utils/react-hooks/use-hoveraway';

import { createPopup, filterPopperTrigger } from '../_utils/popper';
import { flatten } from '../../../../utils/array';
import { filterPlacement } from '../../utils/popper';

function useLatestInstanceRef () {
    const popperRef = React.useRef(null);

    const clean = () => {
        if (popperRef.current) popperRef.current.destroy();
    }

    return [popperRef, clean]
}

const Popper = React.forwardRef(
    function ({
        disabled = false,
        /**
         * @see placment option.placement in popper.js
         */
        placement = 'bottom-start',
        popperOptions = {},
        children: childEles,
        as: _as = React.Fragment,
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
    }, wref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
        trigger = filterPopperTrigger(trigger)

        const triggerElRef = React.useRef(null)
        const overlayElRef = React.useRef(null)

        const [laref, cleanLaref] = useLatestInstanceRef();

        const [isShowPopup, setIsShowPopup] = React.useState(false);

        const { childNodeList } = parseChildrenProp(childEles)

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
                overlayJsx = React.cloneElement(overlayJsx, { ref: overlayElRef })
                if (overlayJsxIdx > -1) children[overlayJsxIdx] = overlayJsx
            }
        }
        restChildren = children.filter(x =>(x !== overlayJsx))

        switch (trigger) {
            case 'click':
            default:
                useClickaway(triggerElRef, undefined, {
                    clickIn: (() => { setIsShowPopup(!isShowPopup) }),
                    clickAway: (nativeEvent) => {
                        if (trigger === 'click' && !dismissOnClickAway) return ;
                        if (!isShowPopup) return ;
                        const clkAwayEl = nativeEvent.target

                        if (
                            clkAwayEl
                            && overlayElRef.current
                            && getHTMLElementFromJSXElement(overlayElRef.current)
                            && getHTMLElementFromJSXElement(overlayElRef.current).contains(clkAwayEl)
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
            if (overlayJsx.props && typeof overlayJsx.props.placement === 'string')
                overlayPlacement = filterPlacement(overlayJsx.props && overlayJsx.props.placement)
            
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

export default Popper