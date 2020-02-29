import React from 'react'
import { Transition } from 'react-transition-group';

import classnames from 'classnames'

import { resolveJSXElement, getHTMLAttributesFromProps } from '../../utils/ui'
import { isReactTypeOf, getHTMLElementFromJSXElement } from '../../../../utils/react-like'
import { arraify } from '../../../../utils/array';

/**
 * @see https://getbootstrap.com/docs/4.4/components/collapse/#supported-content
 */
function CollapseGroup ({
    disabled = false,
    /**
     * @see placment option.placement in poper.js
     */
    children: childEles,
    as: _as = null,
    activeKey = null,
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { default: null, /* allowedHTMLTags: ['div'] */ });

    const children = arraify(childEles)
    const getAllPanels = () => {
        return children
            .filter(item => isReactTypeOf(item, Collapse.Panel))
            .map((panel, idx) => {
                let nextCloneProps
                if (!panel.hasOwnProperty('key')) {
                    panel.key = `panel-${idx}`
                }

                if (activeKey === panel.key) {
                    nextCloneProps = nextCloneProps || {}
                    nextCloneProps.collapse = false
                }

                if (nextCloneProps)
                    panel = React.cloneElement(panel, nextCloneProps)

                return panel
            })
    }

    if (!JSXEl) return getAllPanels()

    return (
        <JSXEl
            {...props}
            className={classnames([
                props.className,
                props.class,
            ])}
        >
            {getAllPanels()}
        </JSXEl>
    )
}

function getTransitionClass(status) {
    return transtionClasses[status] || 'collapse';
}

function getNodeHeight(node) {
    return node.scrollHeight;
}

function noop () {}

const transtionClasses = {
    [`entering`]: 'collapsing',
    [`entered`]: 'collapse show',
    [`exiting`]: 'collapsing',
    [`exited`]: 'collapse',
}

const TransitionTimeouts = {
    Fade:     150, // $transition-fade
    Collapse: 350, // $transition-collapse
    Modal:    300, // $modal-transition
    Carousel: 600, // $carousel-transition
};

function Collapse ({
    children,
    as: _as = 'div',
    collapse = true,
    onEntering = noop,
    onEntered = noop,
    onExit = noop,
    onExiting = noop,
    onExited = noop,
    ...props
}, ref) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

    const isOpened = !collapse

    let [ height, setHeight ] = React.useState(null);
    const hRef = React.useRef(height)

    const _onEntering = ((node, isAppearing) => {
        setHeight(getNodeHeight(node));
        onEntering(node, isAppearing);
    })

    const _onEntered = ((node, isAppearing) => {
        setHeight(null);
        hRef.current = height;
        onEntered(node, isAppearing);
    })

    const _onExit = ((node) => {
        /**
         * @why for preact, variable `height` would be changed in next tick,
         * but collapse(exit) had started before that,
         * the value of `height` kept previous `null`(which expected as real
         * height of the opened element) -- you wouldn't see the animation 
         * when collapse(exit) starting.
         * 
         * for fix it, we use one standalone ref Value `hRef` to store
         * "real" height of the opened element, and apply it to collapsing
         * element like variable `height` -- though `height` equals to `null` when animation
         * started, `hRef.current` equals to real height of full-open element, so
         * we could really trigger animation when collapse(exit) started 
         */
        setHeight(getNodeHeight(node));
        onExit(node);
    })

    const _onExiting = ((node) => {
        hRef.current = null;
        setHeight(0);
        onExiting(node);
    })

    const _onExited = ((node) => {
        setHeight(null);
        onExited(node);
    })

    ref = ref || React.useRef(null)

    return (
        <>
            <Transition
                {...Transition.defaultProps}
                appear={false}
                enter={true}
                exit={true}
                timeout={{
                    enter: TransitionTimeouts.Collapse,
                    exit: TransitionTimeouts.Collapse,
                }}
                in={isOpened}
                onEntering={_onEntering}
                onEntered={_onEntered}
                onExit={_onExit}
                onExiting={_onExiting}
                onExited={_onExited}
            >
                {state => {
                    return (
                        <JSXEl
                            {...props}
                            {...ref && { ref }}
                            data-transition-state={state}
                            className={classnames([
                                props.className,
                                props.class,
                                getTransitionClass(state),
                            ])}
                            style={{
                                ...props.style,
                                ...height !== null && { height: height },
                                ...hRef.current !== null && { height: hRef.current },
                            }}
                        >
                            {children}
                        </JSXEl>
                    )
                }}
            </Transition>
        </>
    )
}

export default React.forwardRef(Collapse)