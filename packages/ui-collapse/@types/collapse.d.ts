import React from 'react';
import { RebootUI } from '@reboot-ui/common';
declare const Collapse: {
    (props: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        collapse?: boolean | undefined;
        onEntering?: ((node: HTMLElement, isAppearing: boolean) => void) | undefined;
        onEntered?: ((node: HTMLElement, isAppearing: boolean) => void) | undefined;
        onExit?: ((node: HTMLElement) => void) | undefined;
        onExiting?: ((node: HTMLElement) => void) | undefined;
        onExited?: ((node: HTMLElement) => void) | undefined;
    }>): JSX.Element;
    Uncontrolled: ({ toggler: togglerSelector, defaultCollapsed, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        toggler: RebootUI.DOMSelector;
        defaultCollapsed?: boolean | undefined;
    }>) => JSX.Element;
    useGroup(): React.Context<{
        activeKey: null;
    }>[];
    /**
     * @see https://getbootstrap.com/docs/4.4/components/collapse/#supported-content
     */
    Group({ children: childEles, as: _as, activeKey, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        activeKey: string | number | null;
    }>): any[] | JSX.Element;
};
export default Collapse;
