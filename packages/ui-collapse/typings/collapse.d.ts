import React from 'react';
import { RebootUI } from '@reboot-ui/common';
declare const Collapse: {
    (props: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        collapse?: boolean | undefined;
        onEntering?: ((node: HTMLElement, isAppearing: boolean) => void) | undefined;
        onEntered?: ((node: HTMLElement, isAppearing: boolean) => void) | undefined;
        onExit?: ((node: HTMLElement) => void) | undefined;
        onExiting?: ((node: HTMLElement) => void) | undefined;
        onExited?: ((node: HTMLElement) => void) | undefined;
    }>): JSX.Element;
    Uncontrolled: ({ toggler: togglerSelector, defaultCollapsed, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
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
    Group({ children: childEles, as: _as, activeKey, ...props }: React.PropsWithChildren<React.Props<any> & React.HTMLAttributes<any> & {
        as?: any;
        ref?: ((instance: any) => void) | React.RefObject<any> | null | undefined;
        class?: string | undefined;
    } & {
        activeKey: string | number | null;
    }>): any[] | JSX.Element;
};
export default Collapse;
