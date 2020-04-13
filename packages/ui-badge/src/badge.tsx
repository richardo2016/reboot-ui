import React from 'react'

import { resolveJSXElement, RebootUI } from '@reboot-ui/common'
import { rclassnames } from '@reboot-ui/common'

/**
 * @see https://getbootstrap.com/docs/4.4/components/badge
 */
export default React.forwardRef(
    function ({
        children,
        as: _as = 'span',
        theme,
        pill = false,
        ...props
    }: RebootUI.IComponentPropsWithChildren<{
        as?: RebootUI.IPropAs<'button' | 'span' | 'a'>
        theme?: RebootUI.ThemeType
        pill?: boolean
    }>, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['button', 'span', 'a'] });

        switch (theme) {
            case 'primary':
            case 'secondary':
            case 'success':
            case 'danger':
            case 'warning':
            case 'info':
            case 'light':
            case 'dark':
            case 'link':
                break
            default:
                theme = undefined
                break
        }

        return (
            <JSXEl
                {...props}
                ref={ref}
                className={rclassnames(props, [
                    'badge',
                    theme && `badge-${theme}`,
                    pill && `badge-pill`,
                ])}
            >
                {children}
            </JSXEl>
        )
    }
)