import React from 'react'
import { arraify, dedupe, flatten } from './array'
import classnames from 'classnames'

export function getHTMLElementFromJSXElement (jsxElement) {
    if (jsxElement instanceof HTMLElement) return jsxElement

    // preact
    if (jsxElement && jsxElement.base instanceof HTMLElement) return jsxElement.base

    throw new Error(`[getHTMLElementFromJSXElement] invalid react-like jsxElement`)
}

export function componentOrElementContains (jsxElement, targetEl) {
    const element = getHTMLElementFromJSXElement(jsxElement)

    return element.contains(targetEl)
}

export function isHTMLElementOf (input, compare) {
    switch (compare) {
        case 'html': return input instanceof HTMLHtmlElement;
        case 'head': return input instanceof HTMLHeadElement;
        case 'meta': return input instanceof HTMLMetaElement;
        case 'title': return input instanceof HTMLTitleElement;
        case 'link': return input instanceof HTMLLinkElement;
        case 'script': return input instanceof HTMLScriptElement;
        case 'body': return input instanceof HTMLBodyElement;
        case 'div': return input instanceof HTMLDivElement;
        case 'header': return input instanceof HTMLHeaderElement;
        case 'a': return input instanceof HTMLAElement;
        case 'svg': return input instanceof HTMLSvgElement;
        case 'path': return input instanceof HTMLPathElement;
        case 'ul': return input instanceof HTMLUlElement;
        case 'li': return input instanceof HTMLLiElement;
        case 'form': return input instanceof HTMLFormElement;
        case 'span': return input instanceof HTMLSpanElement;
        case 'input': return input instanceof HTMLInputElement;
        case 'pre': return input instanceof HTMLPreElement;
        case 'button': return input instanceof HTMLButtonElement;
        case 'nav': return input instanceof HTMLNavElement;
        case 'main': return input instanceof HTMLMainElement;
        case 'h1': return input instanceof HTMLH1Element;
        case 'h2': return input instanceof HTMLH2Element;
        case 'h3': return input instanceof HTMLH3Element;
        case 'h4': return input instanceof HTMLH4Element;
        case 'h5': return input instanceof HTMLH5Element;
        case 'p': return input instanceof HTMLPElement;
        case 'code': return input instanceof HTMLCodeElement;
        case 'label': return input instanceof HTMLLabelElement;
        case 'small': return input instanceof HTMLSmallElement;
        case 'figure': return input instanceof HTMLFigureElement;
        case 'select': return input instanceof HTMLSelectElement;
        case 'option': return input instanceof HTMLOptionElement;
        case 'textarea': return input instanceof HTMLTextareaElement;
        case 'strong': return input instanceof HTMLStrongElement;
        case 'fieldset': return input instanceof HTMLFieldsetElement;
        case 'legend': return input instanceof HTMLLegendElement;
        case 'em': return input instanceof HTMLEmElement;
    }

    return input === compare
}

export function isReactTypeOf (input, compare) {
    if (Array.isArray(compare)) return compare.some(citem => isReactTypeOf(input, citem))
    if (input.type === compare) return true
}

export function parseChildrenProp (childEle) {
    const isFragment = childEle ? isReactTypeOf(childEle, React.Fragment) : false
    const childNodes = isFragment ? childEle.props.children : childEle
    
    return {
        isFragment,
        childNodes,
        childNodeList: arraify(childNodes),
    }
}

export function rclassnames (props, ...args) {
    const clsList = dedupe(
        flatten(args)
            .concat([ props.className, props.class ])
            .filter(x => x && typeof x === 'string')
            .map(x => x && x.trim())
    )

    if (!clsList.length) return ;
    return clsList.join(' ')
}

export function tryUseContext (ContextRef, { fallbackValue = {} } = {}) {
  let ctx = fallbackValue
  try { ctx = React.useContext(ContextRef) } catch (error) {}

  return ctx
}

export function renderChildren (children, renderContext) {
    if (typeof children === 'function')
        return children.call(null, renderContext)

    return children
}