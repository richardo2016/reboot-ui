import React from 'react'

import { Transition } from 'react-transition-group';

import { TransitionStatus } from 'react-transition-group/Transition';

import {
    rclassnames,
    useDefaultValue,
    TransitionTimeouts,
    resolveJSXElement,
    RebootUI
} from '@reboot-ui/common'

function getTransitionClass(status: TransitionStatus) {
    return transtionClasses[status] || 'collapse';
}

function getNodeHeight(node: HTMLElement) {
    return node.scrollHeight;
}

function noop () {}

const transtionClasses: {[P in TransitionStatus]: string} = {
    [`entering`]: 'collapsing',
    [`entered`]: 'collapse show',
    [`exiting`]: 'collapsing',
    [`exited`]: 'collapse',
    [`unmounted`]: ''
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
}: RebootUI.IComponentPropsWithChildren<{
    collapse?: boolean
    onEntering?: (node: HTMLElement, isAppearing: boolean) => void
    onEntered?: (node: HTMLElement, isAppearing: boolean) => void
    onExit?: (node: HTMLElement) => void
    onExiting?: (node: HTMLElement) => void
    onExited?: (node: HTMLElement) => void
}>, ref?: RebootUI.ReactRef) {
    const JSXEl: any = resolveJSXElement(_as, { /* allowedHTMLTags: ['div'] */ });

    const [ collapse, setCollapse ] = React.useState(true)
    useDefaultValue(propCollapsed, (defaultValue) => {
        if (defaultValue !== collapse)
            setCollapse(defaultValue)
    })

    React.useEffect(() => {
        setCollapse(propCollapsed)
    }, [propCollapsed])

    let [ height, setHeight ] = React.useState<number | null>(null);
    const hRef = React.useRef(height)

    const _onEntering: typeof onEntering = ((node, isAppearing) => {
        setHeight(getNodeHeight(node));
        onEntering(node, isAppearing);
    })

    const _onEntered: typeof onEntered = ((node, isAppearing) => {
        setHeight(null);
        hRef.current = height;
        onEntered(node, isAppearing);
    })

    const _onExit: typeof onExit = ((node) => {
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

    const _onExiting: typeof onExiting = ((node) => {
        hRef.current = null;
        setHeight(0);
        onExiting(node);
    })

    const _onExited: typeof onExited = ((node) => {
        setHeight(null);
        onExited(node);
    })

    ref = ref || React.useRef(null)

    return (
        <>
            <Transition
                {...(Transition as any).defaultProps}
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