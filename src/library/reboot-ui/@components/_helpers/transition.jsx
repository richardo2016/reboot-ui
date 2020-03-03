import React from 'react'

import { resolveJSXElement } from "../../utils/ui";
import { Transition } from "react-transition-group";
import { TransitionTimeouts } from "../common";
import { rclassnames } from "../../../../utils/react-like";

const RbTransitionFade = React.forwardRef(
    function ({
        children,
        as: _as = 'div',
        transitionActive = false,
        disabled = false,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const [isShow, setIsShow] = React.useState(transitionActive)
        
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
                timeout={TransitionTimeouts.Fade}
                in={transitionActive}
                onEntered={_onEntered}
                onExited={_onExited}
            >
                <JSXEl
                    {...props}
                    ref={ref}
                    className={rclassnames(props, [
                        'fade',
                        transitionActive && isShow && 'show',
                        transitionActive && 'active',
                    ])}
                >
                    {children}
                </JSXEl>
            </Transition>
        )
    }
)

export default RbTransitionFade