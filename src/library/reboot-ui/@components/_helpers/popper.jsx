import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames, parseChildrenProp, isReactTypeOf, getHTMLElementFromJSXElement } from '../../../../utils/react-like';
import useClickaway from '../../../../utils/react-hooks/use-clickaway';
import useHoveraway from '../../../../utils/react-hooks/use-hoveraway';

import { createPopup, filterPopperTrigger } from '../_utils/popper';
import { flatten } from '../../../../utils/array';
import RbTransition from './transition';
import { omit } from '../../../../utils/object';
import { TransitionTimeouts } from '../common';

function useLatestInstanceRef () {
    const latestPopperInstanceRef = React.useRef(null);

    const clean = () => {
        if (latestPopperInstanceRef.current) latestPopperInstanceRef.current.destroy();
    }

    return [latestPopperInstanceRef, clean]
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
        overlayElementProps = {},
        overlay: popupJsxEl = null,
        migrateOverlayChildrenToTransition = false,
        getOverlay,
        dismissOnClickAway = true,
        destroyOnUnmount = true,
        alwayRenderTransitionChildren = false,
        /**
         * @description specifiy the way popper show
         * @enum click
         */
        trigger = 'click',
        ...props
    }, wref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
        trigger = filterPopperTrigger(trigger)

        const triggerElRef = React.useRef(null)
        const popupRef = React.createRef()

        const transitionStateMacroRef = React.useRef(null)

        const [laref, cleanLaref] = useLatestInstanceRef();

        const [showPopup, setShowPopup] = React.useState(false);

        const { childNodeList } = parseChildrenProp(childEles)

        const children = flatten(childNodeList).filter(x => x)

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
            if (typeof getOverlay === 'function') {
                popupJsxEl = getOverlay({
                    overlayType,
                    popperChildren: children,
                    triggerRef: triggerJsxEl
                })
            } else {
                let popupJsxElIdx = -1
                if (
                    !popupJsxEl
                    && (
                        popupJsxElIdx = children.findIndex(child => isReactTypeOf(child, overlayType))
                    ) > -1
                ) {
                    popupJsxEl = children[popupJsxElIdx]
                }
                if (popupJsxEl) {
                    popupJsxEl = React.cloneElement(popupJsxEl, {...overlayElementProps, ref: popupRef})
                    if (popupJsxElIdx > -1) children[popupJsxElIdx] = popupJsxEl
                }
            }
        }

        let restChildren = children.filter(x =>(x !== popupJsxEl))

        switch (trigger) {
            case 'click':
            default:
                useClickaway(triggerElRef, undefined, {
                    clickIn: (() => { setShowPopup(!showPopup) }),
                    clickAway: (nativeEvent) => {
                        if (trigger === 'click' && !dismissOnClickAway) return ;
                        if (!showPopup) return ;
                        const clkAwayEl = nativeEvent.target

                        if (
                            clkAwayEl
                            && popupRef.current
                            && getHTMLElementFromJSXElement(popupRef.current)
                            && getHTMLElementFromJSXElement(popupRef.current).contains(clkAwayEl)
                        ) return ;
                        setShowPopup(false)
                    }
                })
                break
            case 'hover':
                useHoveraway(triggerElRef, {
                    onIn: () => setShowPopup(true),
                    onAway: () => {
                        let lastTransDuration = TransitionTimeouts.Fade
                        try { lastTransDuration = transitionStateMacroRef.current.duration.exit } catch (error) {}

                        setShowPopup(false);
                    },
                })
                break
        }

        React.useLayoutEffect(() => {
            if (!showPopup) return ;
            if (!triggerElRef.current) return ;
            if (!popupRef.current) return ;

            let overlayPlacement = placement
            /**
             * @TODO use breakPoint of bootstrap, resolve objective-type placement and use it.
             */
            if (popupJsxEl.props && typeof popupJsxEl.props.placement === 'string')
                overlayPlacement = filterPlacement(popupJsxEl.props && popupJsxEl.props.placement)
            
            laref.current = createPopup(
                getHTMLElementFromJSXElement(triggerElRef.current),
                getHTMLElementFromJSXElement(popupRef.current),
                {
                    ...popperOptions,
                    placement: overlayPlacement,
                }
            )

            return () => {
                if (destroyOnUnmount) cleanLaref();
            }
        }, [showPopup])

        const INNER_NODE = (
            <>
                {restChildren}
                {(
                    <RbTransition
                        {...migrateOverlayChildrenToTransition && omit(popupJsxEl.props, 'children')}
                        {...overlayProps}
                        transitionProps={{
                            stateMacroRef: transitionStateMacroRef,
                            active: showPopup,
                            ...overlayProps && overlayProps.transitionProps,
                        }}
                    >
                        {(alwayRenderTransitionChildren || showPopup) && (
                            !migrateOverlayChildrenToTransition ? popupJsxEl : popupJsxEl.props.children
                        )}
                    </RbTransition>
                )}
            </>
        )

        if (!_as)
            return INNER_NODE

        return (
            <JSXEl
                {...props}
                ref={wref}
                className={rclassnames(props, [
                ])}
            >
                {INNER_NODE}
            </JSXEl>
        )
    }
)

export default Popper