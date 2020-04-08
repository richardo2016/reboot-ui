import React from 'react'

import { resolveJSXElement } from '@reboot-ui/common'
import { rclassnames } from '@reboot-ui/common'

/**
 * @see https://getbootstrap.com/docs/4.4/components/badge
 */
export default React.forwardRef(
    function ({
        children,
        as: _as = 'span',
        theme = '',
        pill = false,
        __htmlAttributes,
        ...props
    }, ref) {
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
                break
            case 'link':
                outline = false
                break
            default:
                theme = ''
                break
        }

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
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