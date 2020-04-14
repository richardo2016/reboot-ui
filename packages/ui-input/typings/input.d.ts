import React from 'react';
import { RebootUI } from '@reboot-ui/common';
declare type IInput = HTMLInputElement | HTMLTextAreaElement;
declare type IInputProps<T = any> = React.InputHTMLAttributes<T> | React.FormHTMLAttributes<T>;
/**
 * @see https://getbootstrap.com/docs/4.4/components/input
 */
export default function ({ children, disabled, textarea, readonly, type, 
/**
 * @notice checkbox's attribute `indeterminate`
 */
indeterminate, ...props }: RebootUI.IComponentPropsWithChildren<IInputProps & {
    disabled?: boolean;
    textarea?: boolean;
    readonly?: boolean;
    type?: HTMLInputElement['type'];
    indeterminate?: HTMLInputElement['indeterminate'];
}>, wref: RebootUI.ReactRef<IInput>): JSX.Element;
export {};
