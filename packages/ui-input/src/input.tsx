import React, { HtmlHTMLAttributes } from 'react'

import { rclassnames, RebootUI } from '@reboot-ui/common'
import { filterInputType } from '@reboot-ui/common'

type IInput = HTMLInputElement | HTMLTextAreaElement
type IInputProps<T = any> = React.InputHTMLAttributes<T> | React.FormHTMLAttributes<T>

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
    ...props
}: RebootUI.IComponentPropsWithChildren<
    IInputProps & {
        disabled?: boolean
        textarea?: boolean
        readonly?: boolean
        type?: HTMLInputElement['type']
        indeterminate?: HTMLInputElement['indeterminate']
    }
>, wref: RebootUI.ReactRef<IInput>) {
    const JSXEl = textarea ? 'textarea' : 'input'
    type = textarea ? '' : filterInputType(type) || 'text'

    const inputHTMLElRef = React.useRef<IInput | null>(null)

    const ref: any = wref || props.ref || React.useRef<IInput | null>(null);

    return (
        <JSXEl
            {...props}
            {...readonly && { readonly }}
            {...disabled && { disabled: true }}
            {...type && { type }}
            {...type === 'checkbox' && indeterminate !== undefined && { indeterminate }}
            ref={((el: IInput) => {
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