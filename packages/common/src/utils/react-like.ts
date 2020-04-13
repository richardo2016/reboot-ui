import React, { ReactNode } from 'react'
import { arraify, dedupe, flatten } from './array'

export function getHTMLElementFromJSXElement<T = Document> (
    jsxElement: React.ReactNode
): T | HTMLElement {
    if (jsxElement instanceof HTMLElement) return jsxElement

    // preact
    if (jsxElement && (jsxElement as any).base instanceof HTMLElement) return (jsxElement as any).base

    throw new Error(`[getHTMLElementFromJSXElement] invalid react-like jsxElement`)
}

export function componentOrElementContains (
    jsxElement: React.ReactNode,
    targetEl: Node | null
) {
    const element = getHTMLElementFromJSXElement(jsxElement)

    return element.contains(targetEl)
}

export function isHTMLElementOf (
    input: HTMLElement,
    compare: string | HTMLElement
) {
    switch (compare) {
        case 'html': return input instanceof HTMLHtmlElement;
        case 'head': return input instanceof HTMLHeadElement;
        case 'meta': return input instanceof HTMLMetaElement;
        case 'title': return input instanceof HTMLTitleElement;
        case 'link': return input instanceof HTMLLinkElement;
        case 'script': return input instanceof HTMLScriptElement;
        case 'body': return input instanceof HTMLBodyElement;
        case 'div': return input instanceof HTMLDivElement;
        case 'header': return input instanceof HTMLElement;
        case 'a': return input instanceof HTMLAnchorElement;
        case 'svg': return input instanceof SVGElement;
        case 'path': return input instanceof SVGPathElement;
        case 'ul': return input instanceof HTMLUListElement;
        case 'li': return input instanceof HTMLLIElement;
        case 'form': return input instanceof HTMLFormElement;
        case 'span': return input instanceof HTMLSpanElement;
        case 'input': return input instanceof HTMLInputElement;
        case 'pre': return input instanceof HTMLPreElement;
        case 'button': return input instanceof HTMLButtonElement;
        case 'nav': return input instanceof HTMLElement;
        case 'main': return input instanceof HTMLElement;
        case 'h1': return input instanceof HTMLHeadingElement;
        case 'h2': return input instanceof HTMLHeadingElement;
        case 'h3': return input instanceof HTMLHeadingElement;
        case 'h4': return input instanceof HTMLHeadingElement;
        case 'h5': return input instanceof HTMLHeadingElement;
        case 'p': return input instanceof HTMLParagraphElement;
        case 'code': return input instanceof HTMLElement;
        case 'label': return input instanceof HTMLLabelElement;
        case 'small': return input instanceof HTMLElement;
        case 'figure': return input instanceof HTMLElement;
        case 'select': return input instanceof HTMLSelectElement;
        case 'option': return input instanceof HTMLOptionElement;
        case 'textarea': return input instanceof HTMLTextAreaElement;
        case 'strong': return input instanceof HTMLElement;
        case 'fieldset': return input instanceof HTMLElement;
        case 'legend': return input instanceof HTMLLegendElement;
        case 'em': return input instanceof HTMLElement;
    }

    return input === compare
}

export function isReactTypeOf (
    input: any,
    compare: React.ReactNode | React.ReactNode[]
): boolean {
    if (Array.isArray(compare)) return compare.some(citem => isReactTypeOf(input, citem))

    return input.type === compare
}

export function parseChildrenProp (childEle: React.ReactElement) {
    const isFragment = childEle ? isReactTypeOf(childEle, React.Fragment) : false
    const childNodes = isFragment ? childEle.props.children : childEle
    
    return {
        isFragment,
        childNodes,
        childNodeList: arraify(childNodes),
    }
}

export function rclassnames (props: Partial<any>, ...args: any[]) {
    const clsList = dedupe(
        flatten(args)
            .concat([ props.className, props.class ])
            .filter(x => x && typeof x === 'string')
            .map(x => x && x.trim())
            .join(' ')
            .split(' ')
    )

    if (!clsList.length) return ;
    return clsList.join(' ')
}

export function tryUseContext<T extends {} = {}> (
    ContextRef: React.Context<T>,
    { fallbackValue = {} } = {}
) {
    let ctxValue = fallbackValue
    try { ctxValue = React.useContext<T>(ContextRef) } catch (error) {}

    return ctxValue as T
}

export function renderJSXFunc (
    children: Function | React.ReactNode,
    renderContext = {}
) {
    if (typeof children === 'function')
        return children.call(null, renderContext)

    return children
}