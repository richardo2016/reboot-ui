import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames, parseChildrenProp, isReactTypeOf, getHTMLElementFromJSXElement } from '../../../../utils/react-like';
import useClickaway from '../../../../utils/react-hooks/use-clickaway';
import useHoveraway from '../../../../utils/react-hooks/use-hoveraway';

import { createPopup, filterPoperTrigger } from '../_utils/popper';

const Poper = React.forwardRef(
    function ({
        disabled = false,
        /**
         * @see placment option.placement in popper.js
         */
        placement = 'bottom-start',
        poperOptions = {},
        children: childEles,
        as: _as = React.Fragment,
        overlayType = React.Fragment,
        overlay: popupJsxEl = null,
        dismissOnClickAway = true,
        /**
         * @description specifiy the way popper show
         * @enum click
         */
        trigger = 'click',
        ...props
    }, wref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });
        trigger = filterPoperTrigger(trigger)

        const triggerElRef = React.useRef(null)
        const popupRef = React.createRef()

        const [showPopup, setShowPopup] = React.useState(false);

        const { childNodeList } = parseChildrenProp(childEles)

        const children = childNodeList.filter(x => x)
        let triggerJsxElIdx = children.findIndex(child => child.props.poperTrigger)
        triggerJsxElIdx = triggerJsxElIdx > -1 ? triggerJsxElIdx : 0
        let triggerJsxEl = children[triggerJsxElIdx] || null
        if (triggerJsxEl) {
            triggerJsxEl = React.cloneElement(triggerJsxEl, {ref: triggerElRef})
            if (triggerJsxElIdx > -1) children[triggerJsxElIdx] = triggerJsxEl
        }

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
            popupJsxEl = React.cloneElement(popupJsxEl, {ref: popupRef})
            if (popupJsxElIdx > -1) children[popupJsxElIdx] = popupJsxEl
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
                    onAway: () => setShowPopup(false),
                })
                break
        }

        React.useLayoutEffect(() => {
            if (popupJsxEl && popupJsxEl.props)
                popupJsxEl = React.cloneElement(popupJsxEl, { active: true })

            if (!showPopup) return ;
            if (!triggerElRef.current) return ;
            if (!popupRef.current) return ;

            let overlayPlacement = placement
            /**
             * @TODO use breakPoint of bootstrap, resolve objective-type placement and use it.
             */
            if (popupJsxEl.props && typeof popupJsxEl.props.placement === 'string')
                overlayPlacement = filterPlacement(popupJsxEl.props && popupJsxEl.props.placement)

            const instance = createPopup(
                getHTMLElementFromJSXElement(triggerElRef.current),
                getHTMLElementFromJSXElement(popupRef.current),
                {
                    ...poperOptions,
                    placement: overlayPlacement,
                }
            )

            return () => {
                instance.destroy();
            }
        }, [showPopup])

        const INNER_NODE = (
            <>
                {restChildren}
                {showPopup && popupJsxEl}
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

export default Poper