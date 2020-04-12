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
    type IComponentPropsWithChildren<T> = React.PropsWithChildren<{
        as?: string;
    } & T>;
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
export declare function filterFormControlSize(size?: string): string | undefined;
export declare function filterPlaceholderSize(size?: string): string | undefined;
export declare function filterPaginationSize(size?: string): string | undefined;
export declare function filterInputType(type?: string): string | undefined;
export declare function filterAxis(axis?: string): string;
export declare function filterPopperTrigger(trigger: string): string;
export declare function filterPlacement(placement?: string): string;
export declare function parsePlacement(placement?: string): {
    placement: string;
    direction: string | undefined;
    axis: string | undefined;
};
export declare function resolveJSXElement(inputJSXElement: React.ReactElement | string, { default: defaultValue, allowedHTMLTags }?: {
    default?: React.ReactNode;
    allowedHTMLTags?: string[];
}): {} | null;
export declare function getHTMLAttributesFromProps(props: any): any;
