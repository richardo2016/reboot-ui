import React from 'react'

import { getRowColsClsNameListFromBreakPointConfig } from '@reboot-ui/internal-size-resolver'
import { resolveJSXElement, rclassnames, RebootUI } from '@reboot-ui/common'

/**
 * @description
 * @see `.no-gutters`: https://getbootstrap.com/docs/4.4/layout/grid/#no-gutters
 * 
 */
export default function Row ({
    children,
    as: _as = 'div',

    rowCols = undefined,
    sm = undefined,
    md = undefined,
    lg = undefined,
    xl = undefined,
    ...props
}: RebootUI.IComponentPropsWithChildren<
    {} & Parameters<typeof getRowColsClsNameListFromBreakPointConfig>[0]
>
) {
    const clsNameList = getRowColsClsNameListFromBreakPointConfig({ rowCols, sm, md, lg, xl })

    const JSXEl = resolveJSXElement(_as)

    return (
        <JSXEl
            {...props}
            className={
                rclassnames(props, [
                    'row'
                ], clsNameList)
            }
        >
            {children}
        </JSXEl>
    )
}