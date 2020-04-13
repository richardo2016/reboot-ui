import React from 'react'

import { resolveJSXElement, RebootUI } from '@reboot-ui/common'
import { rclassnames } from '@reboot-ui/common'

/**
 * @see https://getbootstrap.com/docs/4.4/components/button-group
 */
export default function ButtonGroup ({
    children,
    as: _as = 'div',
    size,
    vertical = false,
    toggle = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    as?: RebootUI.IPropAs<'div'>
    size?: RebootUI.BinarySizeType
    vertical?: boolean
    toggle?: boolean
}>) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div'] });

    switch (size) {
        case 'lg':
        case 'sm':
            break
        default:
            size = undefined
            break
    }

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                `btn-group${vertical ? '-vertical' : ''}`,
                size && `btn-group-${size}`,
                toggle && `btn-group-toggle`,
            ])}
            role="group"
        >
            {children}
        </JSXEl>
    )
}