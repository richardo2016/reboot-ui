import React from 'react'

import { resolveJSXElement, rclassnames } from '../../common'

const transtionClasses = {
    [`entering`]: 'fade',
    [`entered`]: 'fade show',
    [`exiting`]: 'fade',
    [`exited`]: 'fade hide',
}

function noop () {}
const DFLT_FADE_DURATION = 150
/**
 * @see https://getbootstrap.com/docs/4.4/components/alerts
 */
const Alert = React.forwardRef((
    ({
        children,
        as: _as = 'div',
        type = '',
        __htmlAttributes,
        /**
         * @type {boolean} whether display
         */
        show: propShow = true,
        /**
         * @type {boolean} whether could be dismiss
         */
        closable = false,
        ...props
    }, ref) => {
        const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

        const [dismiss, setDismiss] = React.useState(!propShow);
        const [shouldRender, setShouldRender] = React.useState(propShow);
    
        switch (type) {
            case 'primary':
            case 'secondary':
            case 'success':
            case 'danger':
            case 'warning':
            case 'info':
            case 'light':
            case 'dark':
                break
            case 'link':
                break
            default:
                type = ''
                break
        }

        ref = ref || React.useRef(null)

        React.useEffect((
            () => {
                const timeout = (
                    ref && ref.current
                    && (parseFloat(window.getComputedStyle(ref.current).transitionDuration) * 1000) || DFLT_FADE_DURATION
                )

                let tmid
                if (dismiss)
                    tmid = setTimeout(() => { setShouldRender(false) }, timeout)

                return () => { clearTimeout(tmid) }
            }
        ), [dismiss])
    
        if (!shouldRender) return ;

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                // data-transition-state={state}
                ref={ref}
                className={rclassnames(props, [
                    'alert',
                    type && `alert-${type}`,
                    closable && `alert-dismissible`,
                    'fade',
                    !dismiss && 'show'
                ])}
                role="alert"
            >
                {children}
                {closable && (
                    <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                        onClick={() => {
                            setDismiss(true)
                        }}
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                )}
            </JSXEl>
        )
    }
))

const Link = React.forwardRef((
    function ({
        children,
        as: _as = 'a',
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['a'] });

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={rclassnames(props,
                    'alert-link',
                )}
            >
                {children}
            </JSXEl>
        )
    }
))

const Heading = React.forwardRef((
    function ({
        children,
        as: _as = 'h1',
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] });

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={rclassnames(props, [
                    'alert-heading',
                ])}
            >
                {children}
            </JSXEl>
        )
    }
))

Alert.Link = Link
Alert.Heading = Heading

export default Alert