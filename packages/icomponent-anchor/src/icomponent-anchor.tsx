import React from 'react'

const Anchor = React.forwardRef(
    function ({
        children,
        href = 'javascript:;',
        ...props
    }: React.PropsWithChildren<{
        href?: string
    // put ref here to compat react/preact
    }>, ref: any) {
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