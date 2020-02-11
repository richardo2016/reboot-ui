import React from 'react'

import classnames from 'classnames'

import { checkResponsiveBreakPoint } from '../../utils/ui'

export default ({
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
                    classnameBase
                ])
            }
        >
            {children}
        </div>
    )
}