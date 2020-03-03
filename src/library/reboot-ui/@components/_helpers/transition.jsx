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
            onEntered = noop,
            onExited = noop,
            ...restTransitionProps
        } = transitionProps

        if (disabled) transitionIn = false

        return (
            <Transition
                {...Transition.defaultProps}
                appear={false}
                enter={true}
                exit={true}
                {...restTransitionProps}
                timeout={duration}
                in={transitionIn}
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
                                ...props.style,
                                ...transitionStateStyle[state]
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

const RbTransition2 = React.forwardRef(
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
            ...restTransitionProps
        } = transitionProps

        const [isShow, setIsShow] = React.useState(transitionIn)
        
        const _onEntered = () => {
            if (disabled) return ;
            setIsShow(true)
        }
        const _onExited = () => {
            if (disabled) return ;
            setIsShow(false)
        }

        return (
            <Transition
                {...Transition.defaultProps}
                appear={false}
                enter={true}
                exit={true}
                {...restTransitionProps}
                timeout={duration}
                in={transitionIn}
                onEntered={_onEntered}
                onExited={_onExited}
            >
                <JSXEl
                    {...props}
                    ref={ref}
                    className={rclassnames(props, [
                        'fade',
                        transitionIn && isShow && 'show',
                    ])}
                >
                    {children}
                </JSXEl>
            </Transition>
        )
    }
)

export default RbTransition