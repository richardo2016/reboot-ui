import React from 'react'

import { resolveJSXElement, RebootUI } from '@reboot-ui/common'
import { isReactTypeOf, rclassnames } from '@reboot-ui/common'
import { arraify } from '@reboot-ui/common'

/**
 * @see https://getbootstrap.com/docs/4.4/components/breadcrumbs
 */
const Breadcrumb = function ({
    children,
    as: _as = 'nav',
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    as?: RebootUI.IPropAs<'nav' | 'div'>
}>) {
    const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['nav', 'div'] });

    children = arraify(children).filter(x => isReactTypeOf(x, Item))

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
            ])}
            aria-label="breadcrumb"
        >
            <ol className="breadcrumb">
                {children}
            </ol>
        </JSXEl>
    )
}

const Item = React.forwardRef((
    function ({
        children,
        as: _as = 'li',
        active = false,
        ...props
    }: RebootUI.IComponentPropsWithChildren<{
        as?: RebootUI.IPropAs<'li'>
        active?: boolean
    }>, ref) {
        const JSXEl = resolveJSXElement(_as, { allowedHTMLTags: ['li'] });
    
        return (
            <JSXEl
                {...props}
                ref={ref}
                className={rclassnames(props, [
                    'breadcrumb-item',
                    active && 'active'
                ])}
            >
                {children}
            </JSXEl>
        )
    }
))

Breadcrumb.Item = Item

export default Breadcrumb