import React from 'react';
/**
 * @see https://getbootstrap.com/docs/4.4/components/breadcrumbs
 */
declare const Breadcrumb: {
    ({ children, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    Item: React.ForwardRefExoticComponent<Pick<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
        active?: boolean | undefined;
    }, "as" | "style" | "active"> & React.RefAttributes<unknown>>;
};
export default Breadcrumb;
