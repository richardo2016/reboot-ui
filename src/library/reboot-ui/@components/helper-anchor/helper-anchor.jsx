import React from 'react'

const Anchor = function ({
    children,
    href = 'javascript:;',
    ...props
}) {
    return (
        <a
            {...props}
            {...href && { href }}
        >
            {children}
        </a>
    )
}

export default Anchor