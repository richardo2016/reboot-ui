import React from 'react'

import { Transition } from 'react-transition-group'

import { TransitionTimeouts, resolveJSXElement, rclassnames } from '../../common';

/**
 * @see https://getbootstrap.com/docs/4.4/components/nav/#supported-content
 * 
 * @inner-content `.tab-content`
 * @inner-content `.tab-pane`
 */
const NavTab = function ({
    children,
    as: _as = 'div',
    /**
     * @enum tabs
     * @enum pills
     */
    theme = '',
    ...props
}) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                "tab-content"
            ])}
        >
            {children}
        </JSXEl>
    )
}

NavTab.Pane = React.forwardRef(
    function ({
        children,
        as: _as = 'div',
        fade = true,
        active = false,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const [isShow, setIsShow] = React.useState(active)
        const _onEntered = () => {
            setIsShow(true)
        }
        const _onExited = () => {
            setIsShow(false)
        }

        return (
            <Transition
                {...Transition.defaultProps}
                appear={false}
                enter={true}
                exit={true}
                timeout={TransitionTimeouts.Fade}
                in={active}
                onEntered={_onEntered}
                onExited={_onExited}
            >
                <JSXEl
                    ref={ref}
                    role="tab-panel"
                    {...props}
                    className={rclassnames(props, [
                        "tab-pane",
                        fade && 'fade',
                        active && isShow && 'show',
                        active && 'active',
                    ])}
                >
                    {children}
                </JSXEl>
            </Transition>
        )
    }
)

export default NavTab