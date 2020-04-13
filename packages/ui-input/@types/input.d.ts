/// <reference types="react" />
import { RebootUI } from '@reboot-ui/common';
/**
 * @see https://getbootstrap.com/docs/4.4/components/input
 */
export default function ({ children, disabled, textarea, readonly, type, 
/**
 * @notice checkbox's attribute `indeterminate`
 */
indeterminate, ref, ...props }: RebootUI.IComponentPropsWithChildren<{
    disabled?: boolean;
    textarea?: boolean;
    readonly?: boolean;
    type?: HTMLInputElement['type'];
    indeterminate?: HTMLInputElement['indeterminate'];
}>): JSX.Element;
