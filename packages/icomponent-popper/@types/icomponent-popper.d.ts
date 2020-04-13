import React, { ReactNode, ReactNodeArray } from 'react';
import { RebootUI } from '@reboot-ui/common';
import { useFixupPopoverToken, createPopup, IPopperOptions, FixupPopoverModifierConfig } from './utils';
export { IPopperOptions, FixupPopoverModifierConfig };
export { createPopup, useFixupPopoverToken };
declare function Popper({ children: childEles, as: _as, disabled, 
/**
 * @see placment option.placement in popper.js
 */
placement, popperOptions, overlayType, overlayProps, overlay: overlayJsx, dismissOnClickAway, destroyOnUnmount, 
/**
 * @description specifiy the way popper show
 * @enum click
 */
trigger, 
/**
 * @developer
 * @description how to compose all childList
 */
compose, ...props }: RebootUI.IComponentPropsWithChildren<{
    disabled?: boolean;
    placement?: RebootUI.PlacementType;
    popperOptions?: IPopperOptions;
    overlayType?: RebootUI.IPropAs;
    overlayProps?: React.Props<any>;
    overlay?: ReactNode;
    dismissOnClickAway?: boolean;
    destroyOnUnmount?: boolean;
    trigger?: 'hover' | 'click';
    compose?: (ctx: {
        children: ReactNode;
        childList: ReactNodeArray;
        restChildren: ReactNodeArray;
        triggerRef: RebootUI.ReactRef;
        overlayRef: RebootUI.ReactRef;
        overlayElement: React.ReactNode;
        isShowPopup: boolean;
    }) => React.ReactNode;
}>, wref: RebootUI.ReactRef): JSX.Element;
declare namespace Popper {
    var Refable: React.ForwardRefExoticComponent<Pick<{
        as?: any;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        disabled?: boolean | undefined;
        placement?: "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | undefined;
        popperOptions?: Partial<import("@popperjs/core/lib").Options> | undefined;
        overlayType?: any;
        overlayProps?: React.Props<any> | undefined;
        overlay?: React.ReactNode;
        dismissOnClickAway?: boolean | undefined;
        destroyOnUnmount?: boolean | undefined;
        trigger?: "hover" | "click" | undefined;
        compose?: ((ctx: {
            children: React.ReactNode;
            childList: React.ReactNodeArray;
            restChildren: React.ReactNodeArray;
            triggerRef: ((instance: any) => void) | React.MutableRefObject<any> | null;
            overlayRef: ((instance: any) => void) | React.MutableRefObject<any> | null;
            overlayElement: React.ReactNode;
            isShowPopup: boolean;
        }) => React.ReactNode) | undefined;
    }, "placement" | "as" | "disabled" | "popperOptions" | "overlayType" | "overlayProps" | "overlay" | "dismissOnClickAway" | "destroyOnUnmount" | "trigger" | "compose" | "style" | "className" | "class"> & React.RefAttributes<any>>;
    var createPopup: (reference: Element | import("@popperjs/core/lib").VirtualElement, popper: HTMLElement, options?: Partial<import("@popperjs/core/lib").Options> | undefined) => import("@popperjs/core/lib").Instance;
    var useFixupPopoverToken: (str?: string) => string;
}
export default Popper;
