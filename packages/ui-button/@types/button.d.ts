import React from 'react';
/**
 * @see https://getbootstrap.com/docs/4.4/components/button
 */
declare const Button: {
    ({ children, divider, as: _as, disabled, outline, block, theme, size, active, ...props }: React.PropsWithChildren<{
        as?: any;
        class?: string | undefined;
    } & React.Props<any> & React.HTMLAttributes<any> & {
        divider?: boolean | undefined;
        disabled?: boolean | undefined;
        outline?: boolean | undefined;
        block?: boolean | undefined;
        theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        size?: "lg" | "sm" | undefined;
        active?: boolean | undefined;
    }>): JSX.Element;
    Checkbox({ children, active: propActive, ...props }: React.PropsWithChildren<{
        as?: any;
        class?: string | undefined;
    } & React.Props<any> & React.HTMLAttributes<any> & {
        active?: boolean | undefined;
        name?: string | undefined;
    }>): JSX.Element;
    Radio({ children, active: propActive, name, ...props }: React.PropsWithChildren<{
        as?: any;
        class?: string | undefined;
    } & React.Props<any> & React.HTMLAttributes<any> & {
        active?: boolean | undefined;
        name?: string | undefined;
    }>): JSX.Element;
};
export default Button;
