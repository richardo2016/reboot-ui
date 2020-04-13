import React from 'react'

import { getOffsetAboutClsNameListFromBreakPointConfig } from '@reboot-ui/internal-size-resolver'
import { resolveJSXElement, rclassnames, RebootUI } from '@reboot-ui/common'

export default function Col ({
    children,
    as: _as = 'div',
    col = false,
    span = undefined,
    offset = undefined,
    /**
     * @break-config
     */
    sm = undefined,
    /**
     * @break-config
     */
    md = undefined,
    /**
     * @break-config
     */
    lg = undefined,
    /**
     * @break-config
     */
    xl = undefined,
    ...props
}: RebootUI.IComponentPropsWithChildren<
    {
        col?: boolean
    } & Parameters<typeof getOffsetAboutClsNameListFromBreakPointConfig>[0]
>) {
    const breakPointAboutClsList = getOffsetAboutClsNameListFromBreakPointConfig({ span, offset, sm, md, lg, xl })

    const JSXEl = resolveJSXElement(_as)

    const clsTuple = [
        sm === true && 'col-sm',
        md === true && 'col-md',
        lg === true && 'col-lg',
        xl === true && 'col-xl',
    ].filter(x => x)
    if (!col)
        col = (!clsTuple.length && !breakPointAboutClsList.length && !span)

    if (col) clsTuple.unshift('col')

    return (
        <JSXEl
            {...props}
            className={rclassnames(
                props, 
                clsTuple
                .concat(breakPointAboutClsList)
            )}
        >
            {children}
        </JSXEl>
    )
}

Col.useColClass = ({
    span,
    offset,
    sm,
    md,
    lg,
    xl
}: Parameters<typeof getOffsetAboutClsNameListFromBreakPointConfig>[0] = {}) => {
    return getOffsetAboutClsNameListFromBreakPointConfig({ span, offset, sm, md, lg, xl })
}