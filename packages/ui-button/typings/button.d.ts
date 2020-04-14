import React from 'react';
/**
 * @see https://getbootstrap.com/docs/4.4/components/button
 */
declare const Button: {
    ({ children, divider, as: _as, disabled, outline, block, theme, size, active, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        divider?: boolean | undefined;
        disabled?: boolean | undefined;
        outline?: boolean | undefined;
        block?: boolean | undefined;
        theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        size?: "lg" | "sm" | undefined;
        active?: boolean | undefined;
    }>): JSX.Element;
    Checkbox({ children, active: propActive, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        active?: boolean | undefined;
        name?: string | undefined;
    }>): JSX.Element;
    Radio({ children, active: propActive, name, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        active?: boolean | undefined;
        name?: string | undefined;
    }>): JSX.Element;
};
export default Button;
