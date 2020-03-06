import React from 'react'

import Input from '../input/component'

/**
 */
const Radio = function ({
    ...props
}) {
    return (
        <Input
            {...props}
            type="radio"
        />
    )
}

export default Radio