import React from 'react'

import { getOffsetAboutClsNameListFromBreakPointConfig, getRowColsClsNameListFromBreakPointConfig } from '@reboot-ui/internal-size-resolver'
import { resolveJSXElement, rclassnames } from '@reboot-ui/common'

export const Container = ({
    children,
    as: _as = 'div',
    fluid = false,
    breakpoint = '',
    ...props
}) => {
    const JSXEl = resolveJSXElement(_as)

    let classnameBase = 'container'
    if (!fluid) {
        if (breakpoint) {
            checkResponsiveBreakPoint(breakpoint)
            classnameBase += `-${breakpoint}`
        }
    } else
        classnameBase = 'container-fluid'

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                classnameBase
            ])}
        >
            {children}
        </JSXEl>
    )
}

/**
 * @description
 * @see `.no-gutters`: https://getbootstrap.com/docs/4.4/layout/grid/#no-gutters
 * 
 */
export const Row = ({
    children,
    as: _as = 'div',
    rowCols = undefined,

    sm = undefined,
    md = undefined,
    lg = undefined,
    xl = undefined,
    ...props
}) => {
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

export const Col = ({
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
}) => {
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
                []
                .concat(clsTuple)
                .concat(breakPointAboutClsList)
            )}
        >
            {children}
        </JSXEl>
    )
}

Col.useColClass = ({ span, offset, sm, md, lg, xl } = {}) => {
    return getOffsetAboutClsNameListFromBreakPointConfig({ span, offset, sm, md, lg, xl })
}