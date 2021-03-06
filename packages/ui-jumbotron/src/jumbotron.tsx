import React from 'react'

import { resolveJSXElement, rclassnames, RebootUI } from '@reboot-ui/common';

/**
 * @see https://getbootstrap.com/docs/4.4/components/jumbotron/#supported-content
 * 
 * @inner-content `.jumbotron`
 */
const Jumbotron = function ({
    children,
    as: _as = 'div',
    fluid = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    fluid?: boolean
}>) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                `jumbotron`,
                fluid && `jumbotron-fluid`,
            ])}
        >
            {children}
        </JSXEl>
    )
}

export default Jumbotron