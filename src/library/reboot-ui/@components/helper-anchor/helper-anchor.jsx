import React from 'react'

const Anchor = React.forwardRef(
    function ({
        children,
        href = 'javascript:;',
        ...props
    }, ref) {
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