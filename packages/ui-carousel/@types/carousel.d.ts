import React from 'react';
import { RebootUI } from '@reboot-ui/common';
export declare type RideMode = 'carousel';
declare const Carousel: {
    ({ children, as: _as, slide, pause: pauseMode, ride: rideMode, interval, keyboard: controlledByKeyborad, crossFade, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        pause: "hover";
        slide?: boolean | undefined;
        ride?: "carousel" | undefined;
        interval?: number | null | undefined;
        keyboard?: boolean | undefined;
        crossFade?: boolean | undefined;
        onMouseEnter?: ((evt: MouseEvent) => void) | undefined;
        onMouseLeave?: ((evt: MouseEvent) => void) | undefined;
    }>, ref: ((instance: any) => void) | React.MutableRefObject<any> | null): JSX.Element;
    Refable: React.ForwardRefExoticComponent<Pick<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        pause: "hover";
        slide?: boolean | undefined;
        ride?: "carousel" | undefined;
        interval?: number | null | undefined;
        keyboard?: boolean | undefined;
        crossFade?: boolean | undefined;
        onMouseEnter?: ((evt: MouseEvent) => void) | undefined;
        onMouseLeave?: ((evt: MouseEvent) => void) | undefined;
    }, "as" | "slide" | "pause" | "ride" | "interval" | "keyboard" | "crossFade" | "style" | "className" | "class" | "onMouseEnter" | "onMouseLeave"> & React.RefAttributes<any>>;
    Indicators({ children, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any> | undefined;
    }>): JSX.Element;
    Inner({ children, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    }>): JSX.Element;
    Caption({ children, as: _as, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    }>): JSX.Element;
    Item: React.ForwardRefExoticComponent<Pick<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        interval?: number | undefined;
    } & Partial<RebootUI.TransitionGroupProps>, "as" | "interval" | "style" | "className" | "class" | "onEnter" | "onEntering" | "onEntered" | "onExit" | "onExiting" | "onExited"> & React.RefAttributes<unknown>>;
    Control({ children, as: _as, prev, next, active, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        prev?: boolean | undefined;
        next?: boolean | undefined;
        active?: boolean | undefined;
    }>): JSX.Element;
    PlaceholderImage({ children, as: _as, size, ...props }: React.PropsWithChildren<{
        as?: string | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | undefined;
        style?: React.CSSProperties | undefined;
        className?: string | undefined;
        class?: string | undefined;
        ref?: React.MutableRefObject<any> | undefined;
    } & {
        size?: "lg" | "sm" | undefined;
    }>): JSX.Element;
};
export default Carousel;
