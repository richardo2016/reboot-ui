import React from 'react'

import { checkResponsiveBreakPoint } from '@reboot-ui/internal-size-resolver'
import { resolveJSXElement, rclassnames, RebootUI } from '@reboot-ui/common'

export default function Container ({
    children,
    as: _as = 'div',
    fluid = false,
    breakpoint,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    fluid?: boolean
    breakpoint?: RebootUI.BreakPointType
}>) {
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