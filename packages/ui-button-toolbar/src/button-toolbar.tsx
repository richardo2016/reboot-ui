import React from 'react'

import { resolveJSXElement, RebootUI } from '@reboot-ui/common'
import { rclassnames } from '@reboot-ui/common'

const ButtonToolbar = function ({
    children,
    as: _as = 'div',
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    as?: RebootUI.IPropAs<'div'>
}>) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div'] });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                props.className,
                props.class,
                'btn-toolbar',
            ])}
            role="toolbar"
        >
            {children}
        </JSXEl>
    )
}

export default ButtonToolbar