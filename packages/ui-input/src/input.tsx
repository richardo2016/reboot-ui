import React from 'react'

import { rclassnames, RebootUI } from '@reboot-ui/common'
import { filterInputType } from '@reboot-ui/common'

/**
 * @see https://getbootstrap.com/docs/4.4/components/input
 */
export default function ({
    children,
    disabled = false, 
    textarea = false,
    readonly = false,
    type = '',
    /**
     * @notice checkbox's attribute `indeterminate`
     */
    indeterminate,
    ref,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    disabled?: boolean
    textarea?: boolean
    // ?
    readonly?: boolean
    type?: HTMLInputElement['type']
    indeterminate?: HTMLInputElement['indeterminate']
    
}>) {
    const JSXEl = textarea ? 'textarea' : 'input'
    type = textarea ? '' : filterInputType(type) || 'text'

    const inputHTMLElRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

    return (
        <JSXEl
            {...props}
            {...readonly && { readonly }}
            {...disabled && { disabled: true }}
            {...type && { type }}
            {...type === 'checkbox' && indeterminate !== undefined && { indeterminate }}
            ref={((el: HTMLInputElement | HTMLTextAreaElement) => {
                inputHTMLElRef.current = el
                if (ref)
                    ref.current = el

                return el
            }) as any}
            className={rclassnames(props, [
                disabled ? `disabled` : '',
            ])}
        >
            {children}
        </JSXEl>
    )
}