import React from 'react'
import { arraify } from '../../src/utils/array'

export { flatten, arraify } from '../../src/utils/array'
export { coerceInteger, coerceFloat } from '../../src/utils/coerce'
export { pick, omit } from "../../src/utils/object"

export function resolveJSXElement (
    inputJSXElement,
    {
        default: defaultValue = React.Fragment,
        allowedHTMLTags = undefined
    } = {}
) {
    if (!inputJSXElement)
        return defaultValue

    if (allowedHTMLTags && typeof inputJSXElement === 'string') {
        inputJSXElement = inputJSXElement.toString()
        allowedHTMLTags = arraify(allowedHTMLTags)
            .filter(x => typeof x === 'string')
            .map(x => x.toString())
        
        if (allowedHTMLTags.length && !allowedHTMLTags.includes(inputJSXElement))
            throw new Error(`[resolveJSXElement] inputJSXElement must be valid string: ${allowedHTMLTags.join(', ')}; but ${inputJSXElement} given!`)
    }

    return inputJSXElement
}

export function getHTMLAttributesFromProps (props) {
    const { __htmlAttributes } = props || {};

    return {...__htmlAttributes}
}