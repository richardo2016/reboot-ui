import React from 'react'

import { rclassnames } from '../../../../utils/react-like'
import { filterInputType } from '../common-utils';

/**
 * @see https://getbootstrap.com/docs/4.4/components/input
 */
const Input = React.forwardRef(
    function ({
        children,
        disabled = false, 
        textarea = false,
        readonly = false,
        type = '',
        size = '',
        /**
         * @notice checkbox's attribute `indeterminate`
         */
        indeterminate,
        id,
        __htmlAttributes,
        ...props
    }, ref) {
        const JSXEl = textarea ? 'textarea' : 'input'
        type = textarea ? '' : filterInputType(type) || 'text'

        const inputHTMLElRef = React.useRef(null)

        return (
            <JSXEl
                {...props}
                {...__htmlAttributes}
                {...id && { id }}
                {...readonly && { readonly }}
                {...disabled && { disabled: true }}
                {...type && { type }}
                {...type === 'checkbox' && indeterminate !== undefined && { indeterminate }}
                ref={(el) => {
                    inputHTMLElRef.current = el
                    return typeof ref === 'function' ? ref(el) : el
                }}
                className={rclassnames(props, [
                    disabled ? `disabled` : '',
                ])}
            >
                {children}
            </JSXEl>
        )
    }
)

export default React.forwardRef(Input)