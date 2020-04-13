import React from 'react';
export { getHTMLElementFromJSXElement } from './utils/react-like';
export { isReactTypeOf } from './utils/react-like';
export { parseChildrenProp } from './utils/react-like';
export { rclassnames, tryUseContext, renderJSXFunc } from './utils/react-like';
export { default as useClickaway } from './utils/react-hooks/use-clickaway';
export { default as useHoveraway } from './utils/react-hooks/use-hoveraway';
export { default as useKeyPress } from './utils/react-hooks/use-keypress';
export { default as usePagination } from './utils/react-hooks/use-pagination';
export { default as useSelectorsListener } from './utils/react-hooks/use-selectors-listener';
export { default as useDefaultValue } from './utils/react-hooks/use-default-value';
export { flatten2trimedStrList } from './utils/string';
export { coerceInteger, coerceFloat } from './utils/coerce';
export { pick, omit } from './utils/object';
export { useInterval } from './utils/react-hooks/use-timer';
export { flatten, arraify } from './utils/array';
export declare namespace RebootUI {
    export type Nilable<T> = null | T;
    export type IComponentPropsWithChildren<T = {}, REFT = any> = React.PropsWithChildren<{
        as?: string | React.ReactElement | null;
        style?: React.CSSProperties;
        className?: string;
        class?: string;
        ref?: React.MutableRefObject<REFT>;
    } & T>;
    export type IPropAs<HTMLTags = any> = React.ReactElement | HTMLTags | string | React.ExoticComponent<any> | React.ForwardRefExoticComponent<any>;
    export type IPropAsTagHeadings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    export type ThemeType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
    export type BinarySizeType = 'lg' | 'sm';
    export type SizeType = 'sm' | 'md' | 'lg' | 'xl';
    export type BreakPointType = 'sm' | 'md' | 'lg' | 'xl';
    export interface BreakPointValues<ValueType = number> {
        sm?: ValueType;
        md?: ValueType;
        lg?: ValueType;
        xl?: ValueType;
    }
    export type DirectionType = 'left' | 'right' | 'top' | 'bottom';
    export type IGetReactLikeComponentProps<TC> = TC extends React.Component<infer U, any> ? U : TC extends React.FunctionComponent<infer U> ? U : never;
    export type ValueOf<T> = T extends object ? T[keyof T] : never;
    type EnterHandler = (node: HTMLElement, isAppearing: boolean) => void;
    type ExitHandler = (node: HTMLElement) => void;
    export interface TransitionGroupProps {
        onEnter?: EnterHandler;
        onEntering?: EnterHandler;
        onEntered?: EnterHandler;
        onExit?: ExitHandler;
        onExiting?: ExitHandler;
        onExited?: ExitHandler;
    }
    export type ReactRef<T = any, P = any> = Parameters<React.ForwardRefRenderFunction<T, P>>[1] | null;
    export type DOMSelector = Document | HTMLElement | string;
    export type DOMEventHandler = EventListener | EventListenerObject | null;
    export {};
}
export declare const themes: string[];
export declare const sizes: string[];
export declare const TransitionTimeouts: {
    Fade: number;
    Collapse: number;
    Modal: number;
    Carousel: number;
};
export declare const TransitionStates: {
    EXITED: string;
    ENTERING: string;
    ENTERED: string;
    EXITING: string;
};
export declare const headingTags: string[];
export declare const inputTypes: string[];
export declare function filterThemeName(theme?: string): RebootUI.ThemeType | undefined;
export declare function filterRepsonsiveSize(size?: string): string | undefined;
export declare function filterFormControlSize(size?: string): RebootUI.BinarySizeType | undefined;
export declare function filterPlaceholderSize(size?: string): RebootUI.BinarySizeType | undefined;
export declare function filterPaginationSize(size?: string): RebootUI.BinarySizeType | undefined;
export declare function filterInputType(type?: string): string | undefined;
export declare function filterAxis(axis?: string): string;
export declare function filterPopperTrigger(trigger: string): string;
export declare function filterPlacement(placement?: string): string;
export declare function parsePlacement(placement?: string): {
    placement: string;
    direction: string | undefined;
    axis: string | undefined;
};
export declare function resolveJSXElement(inputJSXElement: RebootUI.IPropAs, { default: defaultValue, allowedHTMLTags }?: {
    default?: React.ReactElement | React.ExoticComponent | string | null;
    allowedHTMLTags?: string[];
}): any;
export declare function getHTMLAttributesFromProps(props: any): any;
