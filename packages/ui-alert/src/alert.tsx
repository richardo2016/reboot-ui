import React from 'react'

import { resolveJSXElement, rclassnames, RebootUI } from '@reboot-ui/common'

const DFLT_FADE_DURATION = 150
/**
 * @see https://getbootstrap.com/docs/4.4/components/alerts
 */
const Alert = function ({
    children,
    as: _as = 'div',
    theme,
    /**
     * @type {boolean} whether display
     */
    show: propShow = true,
    /**
     * @type {boolean} whether could be dismiss
     */
    closable = false,

    fade = true,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    theme?: 
    'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link',
    show?: boolean,
    closable?: boolean,
    fade?: boolean,
}>, ref: any) {
    const JSXEl: any = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    const [dismiss, setDismiss] = React.useState(!propShow);
    const [shouldRender, setShouldRender] = React.useState(propShow);

    switch (theme) {
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
            theme = undefined
            break
    }

    ref = ref || React.createRef()

    React.useEffect((
        () => {
            const timeout = (
                ref && ref.current
                && (parseFloat(window.getComputedStyle(ref.current).transitionDuration) * 1000) || DFLT_FADE_DURATION
            )

            let tmid: any
            if (dismiss)
                tmid = setTimeout(() => { setShouldRender(false) }, timeout)

            return () => { clearTimeout(tmid) }
        }
    ), [dismiss])

    if (!shouldRender) return ;

    return (
        <JSXEl
            {...props}
            ref={ref}
            // data-transition-state={state}
            className={rclassnames(props, [
                'alert',
                theme && `alert-${theme}`,
                closable && `alert-dismissible`,
                fade && 'fade',
                !dismiss && 'show'
            ])}
            role="alert"
        >
            {children}
            {closable && (
                <button
                    type="button"
                    className="close"
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

const Link = React.forwardRef((
    function ({
        children,
        as: _as = 'a',
        ...props
    }: RebootUI.IComponentPropsWithChildren<{}>, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['a'] });

        return (
            <JSXEl
                {...props}
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
        ...props
    }: RebootUI.IComponentPropsWithChildren<{}>, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] });

        return (
            <JSXEl
                {...props}
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