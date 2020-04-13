import React from 'react'

import { resolveJSXElement, rclassnames, RebootUI } from '@reboot-ui/common';

/**
 */
export default function Table ({
    children,
    as: _as = 'table',
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    as?: RebootUI.IPropAs<'div' | 'table'>
}>) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['div', 'table'] });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                "table"
            ])}
        >
            {children}
        </JSXEl>
    )
}