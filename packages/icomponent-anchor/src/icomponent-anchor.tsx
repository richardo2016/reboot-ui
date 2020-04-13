import React from 'react'

import { RebootUI } from '@reboot-ui/common'

const Anchor = React.forwardRef(
    function (
        {
            children,
            href = 'javascript:;',
            ...props
        }: RebootUI.IComponentPropsWithChildren<{
            href?: string
        }>,
        // put ref here to compat react/preact
        ref: any
    ) {
        return (
            <a
                {...props}
                ref={ref}
                {...href && { href }}
            >
                {children}
            </a>
        )
    }
)

export default Anchor