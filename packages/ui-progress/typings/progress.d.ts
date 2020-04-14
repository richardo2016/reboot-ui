import React from 'react';
/**
 * @see https://getbootstrap.com/docs/4.4/components/progress/
 *
 * @inner-content `.progress-bar`
 * @inner-content `.progress-bar-striped`
 * @inner-content `.progress-bar-animated`
 */
declare const Progress: {
    ({ children, as: _as, ...props }: any): JSX.Element;
    Bar({ children, as: _as, value, min, max, label, bgTheme, striped, animated, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        value?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        label?: React.ReactNode;
        bgTheme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        striped?: boolean | undefined;
        animated?: boolean | undefined;
    }>): JSX.Element;
};
export default Progress;
