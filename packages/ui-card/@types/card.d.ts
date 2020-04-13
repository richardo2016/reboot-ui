import React from 'react';
/**
 * @see https://getbootstrap.com/docs/4.4/components/cards
 */
declare const Card: {
    ({ children, as: _as, theme, borderTheme, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        borderTheme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
    }>): JSX.Element;
    Title({ children, sub, as: _as, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        sub?: boolean | undefined;
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    Header({ children, as: _as, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        borderTheme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    Footer({ children, as: _as, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        borderTheme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    Body({ children, as: _as, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        borderTheme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
    }>): JSX.Element;
    Image({ children, as: _as, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    ImageOverlay({ children, as: _as, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    }>): JSX.Element;
    Text({ children, as: _as, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    }>): JSX.Element;
    Link({ children, sub, as: _as, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        sub?: boolean | undefined;
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    Group({ children, as: _as, deck, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        deck?: boolean | undefined;
    }>): JSX.Element;
    Columns({ children, as: _as, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    }>): JSX.Element;
    Typical({ children, title, subTitle, text, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        title?: string | undefined;
        subTitle?: string | undefined;
        text?: string | undefined;
    } & {
        theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
        borderTheme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" | undefined;
    }>): JSX.Element;
};
export default Card;
