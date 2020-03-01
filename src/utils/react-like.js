import React from 'react'
import { arraify } from './array'

export function getHTMLElementFromJSXElement (jsxElement) {
    if (typeof jsxElement === 'object') {
        if (jsxElement instanceof HTMLElement) return jsxElement
    
        // preact
        if (jsxElement.base instanceof HTMLElement) return jsxElement.base
    }

    throw new Error(`[getHTMLElementFromJSXElement] invalid react-like jsxElement`)
}

export function isReactTypeOf (input, compare) {
    return input.type === compare
}

export function parseChildrenProp (childEle) {
    const isFragment = isReactTypeOf(childEle, React.Fragment)
    const childNodes = isFragment ? childEle.props.children : childEle
    
    return {
        isFragment,
        childNodes,
        childNodeList: arraify(childNodes),
    }
}