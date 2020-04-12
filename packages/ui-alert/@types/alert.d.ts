import React from 'react';
/**
 * @see https://getbootstrap.com/docs/4.4/components/alerts
 */
declare const Alert: {
    ({ children, as: _as, theme, show: propShow, closable, fade, ...props }: React.PropsWithChildren<{
        as?: string | undefined;
        style?: React.CSSProperties | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        show?: boolean | undefined;
        closable?: boolean | undefined;
        fade?: boolean | undefined;
    }>): JSX.Element | undefined;
    Link: React.ForwardRefExoticComponent<Pick<{
        as?: string | undefined;
        style?: React.CSSProperties | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    }, "as" | "style"> & React.RefAttributes<unknown>>;
    Heading: React.ForwardRefExoticComponent<Pick<{
        as?: string | undefined;
        style?: React.CSSProperties | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    }, "as" | "style"> & React.RefAttributes<unknown>>;
};
export default Alert;
