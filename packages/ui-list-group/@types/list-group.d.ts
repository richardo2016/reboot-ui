import React from 'react';
/**
 * @see https://getbootstrap.com/docs/4.4/components/list-group/#supported-content
 *
 * @inner-content `.list-group`
 * @inner-content `.list-group-item`
 */
declare const ListGroup: {
    ({ children, as: _as, flush, horizontal, size, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        flush?: boolean | undefined;
        horizontal?: boolean | undefined;
        size?: string | undefined;
    }>): JSX.Element;
    Item({ children, action, as: _as, active, disabled, theme, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        action?: boolean | undefined;
        active?: boolean | undefined;
        disabled?: boolean | undefined;
        theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
    }>): JSX.Element;
    LinkItem({ ...props }: any): JSX.Element;
    ButtonItem({ children, action, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        action?: boolean | undefined;
    }>): JSX.Element;
};
export default ListGroup;
