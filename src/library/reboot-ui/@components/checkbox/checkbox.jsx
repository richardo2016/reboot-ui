import React from 'react'

import Input from '../input'

/**
 */
const Checkbox = function ({
    ...props
}) {
    return (
        <Input
            {...props}
            type="checkbox"
        />
    )
}

export default Checkbox