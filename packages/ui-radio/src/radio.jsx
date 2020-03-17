import React from 'react'

import Input from '../../ui-input'

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