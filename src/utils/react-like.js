import React from 'react'
import { arraify, dedupe, flatten } from './array'
import classnames from 'classnames'

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

export function rclassnames (props, ...args) {
    return dedupe(
        [ props.className || props.class ].concat(flatten(args))
        .join(' ')
        .split(' ')
        .map(x => x && x.trim())
        .filter(x => x)
    ).join(' ')
}