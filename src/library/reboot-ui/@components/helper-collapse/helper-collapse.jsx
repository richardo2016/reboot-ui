import React from 'react'

import { Transition } from 'react-transition-group';

import { rclassnames } from '../common'
import { useDefaultValue } from '../common'
import { TransitionTimeouts, resolveJSXElement } from '../common';

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

/**
 * @notice this funciton is designed for `React.forwardRef`, wrap it before using it
 */
export default function CollapseProto ({
    children,
    as: _as = 'div',
    collapse: propCollapsed = true,
    onEntering = noop,
    onEntered = noop,
    onExit = noop,
    onExiting = noop,
    onExited = noop,
    ...props
}, ref) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

    const [ collapse, setCollapse ] = React.useState(true)
    useDefaultValue(propCollapsed, (defaultValue) => {
        if (defaultValue !== collapse)
            setCollapse(defaultValue)
    })

    React.useEffect(() => {
        setCollapse(propCollapsed)
    }, [propCollapsed])

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
                in={!collapse}
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
                            // data-transition-state={state}
                            className={rclassnames(props, [
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