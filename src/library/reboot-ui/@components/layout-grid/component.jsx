import React from 'react'

import classnames from 'classnames'

import { getClsNameListFromBreakPointConfig, resolveJSXElement } from '../../utils/ui'

export const Container = ({
    children,
    fluid = false,
    breakpoint = '',
    ...props
}) => {
    let classnameBase = 'container'
    if (!fluid) {
        if (breakpoint) {
            checkResponsiveBreakPoint(breakpoint)
            classnameBase += `-${breakpoint}`
        }
    } else
        classnameBase = 'container-fluid'

    return (
        <div
            {...props}
            className={
                classnames([
                    props.className,
                    props.class,
                    classnameBase
                ])
            }
        >
            {children}
        </div>
    )
}

/**
 * @description
 * @see `.no-gutters`: https://getbootstrap.com/docs/4.4/layout/grid/#no-gutters
 * 
 * @param {*} param0 
 */
export const Row = ({
    children,
    ...props
}) => {
    return (
        <div
            {...props}
            className={
                classnames([
                    props.className,
                    props.class,
                    'row'
                ])
            }
        >
            {children}
        </div>
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
    const breakPointAboutClsList = getClsNameListFromBreakPointConfig({ span, offset, sm, md, lg, xl })
    if (!breakPointAboutClsList)
        breakPointAboutClsList.push('col')

    const JSXEl = resolveJSXElement(_as)

    return (
        <JSXEl
            {...props}
            className={
                classnames(
                    breakPointAboutClsList.concat([
                        props.className,
                    ])
                )
            }
        >
            {children}
        </JSXEl>
    )
}