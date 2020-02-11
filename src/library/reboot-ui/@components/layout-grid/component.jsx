import React from 'react'

import classnames from 'classnames'

import { getClsNameListFromBreakPointConfig } from '../../utils/ui'

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

    return (
        <div
            {...props}
            className={
                classnames([
                    props.className,
                ].concat(breakPointAboutClsList))
            }
        >
            {children}
        </div>
    )
}