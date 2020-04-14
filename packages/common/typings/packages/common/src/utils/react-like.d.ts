import React from 'react';
export declare function getHTMLElementFromJSXElement<T = Document>(jsxElement: React.ReactNode): T | HTMLElement;
export declare function componentOrElementContains(jsxElement: React.ReactNode, targetEl: Node | null): boolean;
export declare function isHTMLElementOf(input: HTMLElement, compare: string | HTMLElement): boolean;
export declare function isReactTypeOf(input: any, compare: React.ReactNode | React.ReactNode[]): boolean;
export declare function parseChildrenProp(childEle: React.ReactElement): {
    isFragment: boolean;
    childNodes: any;
    childNodeList: any[];
};
export declare function rclassnames(props: Partial<any>, ...args: any[]): string | undefined;
export declare function tryUseContext<T extends {} = {}>(ContextRef: React.Context<T>, { fallbackValue }?: {
    fallbackValue?: {} | undefined;
}): T;
export declare function renderJSXFunc(children: Function | React.ReactNode, renderContext?: {}): any;
