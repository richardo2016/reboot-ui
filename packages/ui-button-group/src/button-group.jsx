import React from 'react'

import { resolveJSXElement } from '@reboot-ui/common'
import { rclassnames } from '@reboot-ui/common'

/**
 * @see https://getbootstrap.com/docs/4.4/components/button-group
 */
const ButtonGroup = React.forwardRef((
    function ({
        children,
        as: _as = 'div',
        size = '',
        vertical = false,
        toggle = false,
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div'] });

        switch (size) {
            case 'lg':
            case 'sm':
                break
            default:
                size = ''
                break
        }
    
        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                ref={ref}
                className={rclassnames(props, [
                    props.className,
                    props.class,
                    `btn-group${vertical ? '-vertical' : ''}`,
                    size && `btn-group-${size}`,
                    toggle && `btn-group-toggle`,
                ])}
                role={'group'}
            >
                {children}
            </JSXEl>
        )
    }
))

export default ButtonGroup