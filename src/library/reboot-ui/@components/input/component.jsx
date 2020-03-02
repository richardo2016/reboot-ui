import React from 'react'

import { resolveJSXElement } from '../../utils/ui'
import { rclassnames } from '../../../../utils/react-like'
import { filterInputType } from '../common-utils';

/**
 * @see https://getbootstrap.com/docs/4.4/components/input
 */
function Input ({
    children,
    disabled = false, 
    textarea = false,
    type = '',
    size = '',
    __htmlAttributes,
    ...props
}, ref) {
    const JSXEl = textarea ? 'textarea' : 'input'
    type = textarea ? '' : filterInputType(type) || 'text'

    switch (size) {
        case 'lg':
        case 'sm':
            break
        default:
            size = ''
            break
    }

    return (
        <JSXEl
            {...props}
            {...__htmlAttributes}
            {...disabled && { disabled: true }}
            {...type && { type }}
            ref={ref}
            className={rclassnames(props, [
                disabled ? `disabled` : ''
            ])}
        >
            {children}
        </JSXEl>
    )
}

export default React.forwardRef(Input)