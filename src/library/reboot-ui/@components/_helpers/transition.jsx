import React from 'react'

import { resolveJSXElement } from "../../utils/ui";
import { Transition } from "react-transition-group";
import { TransitionTimeouts } from "../common";
import { rclassnames } from "../../../../utils/react-like";
import { coerceInteger } from '../../../../utils/coerce';

function parseDuration (input) {
    if (typeof input === 'number') input = { enter: input }

    return {
        enter: coerceInteger(input.enter, TransitionTimeouts.Fade),
        exit: coerceInteger(input.exit, 0),
        appear: coerceInteger(input.appear, 0),
    }
}

const DFLT_STATE_STYLE = {}
const DFLT_STATE_CLS = {
    entering: '',
    entered: 'show',
    exiting: '',
    exited: ''
}

function useOnStateChangeHandlers (props) {
    const stateMacroRef = props.stateMacroRef || React.useRef(null);

    stateMacroRef.current = {
        onState: null,
        disabled: !!props.disabled,
        ...stateMacroRef.current,
    };

    const onEnter = ((node, isAppearing) => {
        stateMacroRef.current = { ...stateMacroRef.current, onState: `onEnter` }
        typeof props.onEnter === 'function' && props.onEnter(node, isAppearing);
    })

    const onEntering = ((node, isAppearing) => {
        stateMacroRef.current = { ...stateMacroRef.current, onState: `onEntering` }
        typeof props.onEntering === 'function' && props.onEntering(node, isAppearing);
    })

    const onEntered = ((node, isAppearing) => {
        stateMacroRef.current = { ...stateMacroRef.current, onState: `onEntered` }
        typeof props.onEntered === 'function' && props.onEntered(node, isAppearing);
    })

    const onExit = ((node) => {
        stateMacroRef.current = { ...stateMacroRef.current, onState: `onExit` }
        typeof props.onExit === 'function' && props.onExit(node);
    })

    const onExiting = ((node) => {
        stateMacroRef.current = { ...stateMacroRef.current, onState: `onExiting` }
        typeof props.onExiting === 'function' && props.onExiting(node);
    })

    const onExited = ((node) => {
        stateMacroRef.current = { ...stateMacroRef.current, onState: `onExited` }
        typeof props.onExited === 'function' && props.onExited(node);
    })

    return { stateMacroRef, onEnter, onEntering, onEntered, onExit, onExiting, onExited }
}

function noop () {}
const RbTransition = React.forwardRef(
    function ({
        children,
        as: _as = 'div',
        transitionProps = {},
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const {
            active: transitionIn = false,
            disabled = false,
            duration = TransitionTimeouts.Fade,
            transitionStateStyle = DFLT_STATE_STYLE,
            transitionStateClass = DFLT_STATE_CLS,
            ...restTransitionProps
        } = transitionProps

        const { stateMacroRef, ...restConfig } = useOnStateChangeHandlers(transitionProps)
        stateMacroRef.current.duration = parseDuration(duration)

        if (disabled) transitionIn = false

        return (
            <Transition
                {...Transition.defaultProps}
                appear={false}
                enter={true}
                exit={true}
                {...restTransitionProps}
                timeout={stateMacroRef.current.duration}
                in={transitionIn}
                onEnter={restConfig.onEnter}
                onEntering={restConfig.onEntering}
                onEntered={restConfig.onEntered}
                onExit={restConfig.onExit}
                onExiting={restConfig.onExiting}
                onExited={restConfig.onExited}
            >
                {(state) => {
                    return (
                        <JSXEl
                            {...props}
                            ref={ref}
                            className={rclassnames(props, [
                                transitionStateClass[state],
                            ])}
                            style={{
                                ...transitionStateStyle[state],
                                ...props.style,
                            }}
                        >
                            {children}
                        </JSXEl>
                    )
                }}
            </Transition>
        )
    }
)

export default RbTransition