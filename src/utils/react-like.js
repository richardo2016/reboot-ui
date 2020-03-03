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
    return (
        dedupe(
            flatten(args)
                .concat([ props.className, props.class ])
                .filter(x => x && typeof x === 'string')
                .map(x => x && x.trim())
        ).join(' ')
    )
}

export function tryUseRef (ContextDef, { fallbackValue = {} } = {}) {
  let ctx = fallbackValue
  try { ctx = React.useContext(ContextDef) } catch (error) {}

  return ctx
}