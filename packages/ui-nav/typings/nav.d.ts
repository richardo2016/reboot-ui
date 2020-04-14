import React from 'react';
import { RebootUI } from '@reboot-ui/common';
/**
 * @see https://getbootstrap.com/docs/4.4/components/nav/#supported-content
 *
 * @inner-content `.nav-item`
 * @inner-content `.nav-link`
 */
declare const Nav: {
    ({ children, navAsParent, as: _as, theme, navbar, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        navAsParent?: boolean | undefined;
        theme?: "tabs" | "pills" | undefined;
        navbar?: boolean | undefined;
    }>): JSX.Element;
    List({ children, as: _as, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    Item({ children, link, as: _as, active, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        link?: boolean | undefined;
        active?: boolean | undefined;
    }>): JSX.Element;
    Link({ children, as: _as, active, disabled, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        active?: boolean | undefined;
        disabled?: boolean | undefined;
        as: RebootUI.IPropAs<"ul" | "ol">;
    }>): JSX.Element;
};
export default Nav;
