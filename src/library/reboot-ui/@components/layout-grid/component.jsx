import React from 'react'

import { getOffsetAboutClsNameListFromBreakPointConfig, resolveJSXElement, getDivisionAboutClsNameListFromBreakPointConfig } from '../../utils/ui'
import { rclassnames } from '../../../../utils/react-like'

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
    const clsNameList = getDivisionAboutClsNameListFromBreakPointConfig({ rowCols, sm, md, lg, xl })

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
    breakpoint = '',
    ...props
}) => {
    const breakPointAboutClsList = getOffsetAboutClsNameListFromBreakPointConfig({ span, offset, sm, md, lg, xl })

    const JSXEl = resolveJSXElement(_as)

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                'col',
                breakPointAboutClsList
            ])}
        >
            {children}
        </JSXEl>
    )
}

Col.useColClass = ({ span, offset, sm, md, lg, xl } = {}) => {
    return getOffsetAboutClsNameListFromBreakPointConfig({ span, offset, sm, md, lg, xl })
}