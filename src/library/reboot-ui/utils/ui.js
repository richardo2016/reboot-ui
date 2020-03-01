import React from 'react'
import { coerceInteger } from '../../../utils/coerce'
import { arraify } from '../../../utils/array'

const VALID_RESPONSIVE_BRKPOINT = [
    'sm',
    'md',
    'lg',
    'xl',
]

export function checkResponsiveBreakPoint (bk) {
    if (!VALID_RESPONSIVE_BRKPOINT.includes(bk))
        throw new Error(`[checkResponsiveBreakPoint] invalid breakpoint ${bk}!`)
}

function resolveOffsetAboutBreakPointConfig (input) {
    let { span: spanValue, offset: offsetValue } = input || {};

    return {
        span: coerceInteger(spanValue, 0),
        offset: coerceInteger(offsetValue, 0)
    }
}

function makeOffsetAboutClsFromBreakPointConfig (prefix = 'col', { value: intValue, breakpoint = '' } = {}) {
    if (breakpoint)
        checkResponsiveBreakPoint(breakpoint)

    intValue = coerceInteger(intValue)
    
    switch (prefix) {
        case 'column':
        case 'col':
        case 'span':
            prefix = 'col'
            break
        case 'offset':
            break
        case 'margin':
            prefix = 'm'
            break
        case 'mt':
        case 'mb':
        case 'ml':
        case 'mr':
        case 'mx':
        case 'my':
            break
        case 'padding':
            prefix = 'p'
        case 'pt':
        case 'pb':
        case 'pl':
        case 'pr':
        case 'px':
        case 'py':
            break
        default:
            throw new Error(`[makeOffsetAboutClsFromBreakPointConfig] invalid make target ${prefix}!`)
    }
    
    return `${prefix}-${breakpoint ? `${breakpoint}-` : ''}${intValue}`
}

export function getOffsetAboutClsNameListFromBreakPointConfig ({
    span = undefined,
    offset = undefined,

    sm = undefined,
    md = undefined,
    lg = undefined,
    xl = undefined,
}) {
    const breakPointAboutClsList = []

    if (span = coerceInteger(span))
        breakPointAboutClsList.push( makeOffsetAboutClsFromBreakPointConfig('col', { value: span } ) )

    if (offset = coerceInteger(offset))
        breakPointAboutClsList.push( makeOffsetAboutClsFromBreakPointConfig('offset', { value: offset } ) )

    let tmpResolved
    if (sm) {
        tmpResolved = resolveOffsetAboutBreakPointConfig(sm)
        if (tmpResolved.span)
            breakPointAboutClsList.push( makeOffsetAboutClsFromBreakPointConfig('col', { value: tmpResolved.span, breakpoint: 'sm' } ) )
        if (tmpResolved.offset)
            breakPointAboutClsList.push( makeOffsetAboutClsFromBreakPointConfig('offset', { value: tmpResolved.offset, breakpoint: 'sm' } ) )
    }
    
    if (md) {
        tmpResolved = resolveOffsetAboutBreakPointConfig(md)
        if (tmpResolved.span)
            breakPointAboutClsList.push( makeOffsetAboutClsFromBreakPointConfig('col', { value: tmpResolved.span, breakpoint: 'md' } ) )
        if (tmpResolved.offset)
            breakPointAboutClsList.push( makeOffsetAboutClsFromBreakPointConfig('offset', { value: tmpResolved.offset, breakpoint: 'md' } ) )
    }
    
    if (lg) {
        tmpResolved = resolveOffsetAboutBreakPointConfig(lg)
        if (tmpResolved.span)
            breakPointAboutClsList.push( makeOffsetAboutClsFromBreakPointConfig('col', { value: tmpResolved.span, breakpoint: 'lg' } ) )
        if (tmpResolved.offset)
            breakPointAboutClsList.push( makeOffsetAboutClsFromBreakPointConfig('offset', { value: tmpResolved.offset, breakpoint: 'lg' } ) )
    }
    
    if (xl) {
        tmpResolved = resolveOffsetAboutBreakPointConfig(xl)
        if (tmpResolved.span)
            breakPointAboutClsList.push( makeOffsetAboutClsFromBreakPointConfig('col', { value: tmpResolved.span, breakpoint: 'xl' } ) )
        if (tmpResolved.offset)
            breakPointAboutClsList.push( makeOffsetAboutClsFromBreakPointConfig('offset', { value: tmpResolved.offset, breakpoint: 'xl' } ) )
    }
    

    return breakPointAboutClsList
}

function resolveDirectionAboutBreakPointConfig (direction) {
    switch (direction) {
        case 'left':
        case 'right':
        case 'top':
        case 'bottom':
            break
        default:
            direction = 'top'
    }

    return direction
}

function makeDirectionAboutClsFromBreadkPointConfig (prefix = '', { direction, breakpoint }) {
    if (breakpoint)
        checkResponsiveBreakPoint(breakpoint)

    switch (prefix) {
        case 'dropdown-menu':
            break
        default:
            throw new Error(`[makeBreadkPointConfigClassname] invalid make target ${prefix}!`)
    }

    return `${prefix}-${breakpoint ? `${breakpoint}-` : ''}${direction}`
}

export function getDirectionAboutClsNameListFromBreakPointConfig (prefix, input = {}) {
    const breakPointAboutClsList = []

    let tmpDir
    if (input.direction) {
        tmpDir = resolveDirectionAboutBreakPointConfig(input.direction)
        if (tmpDir) breakPointAboutClsList.push( makeDirectionAboutClsFromBreadkPointConfig(prefix, { direction: tmpDir } ) )
    }

    VALID_RESPONSIVE_BRKPOINT.forEach(breakpoint => {
        if (input[breakpoint]) {
            tmpDir = resolveDirectionAboutBreakPointConfig(input[breakpoint])
            if (tmpDir)
                breakPointAboutClsList.push( makeDirectionAboutClsFromBreadkPointConfig(prefix, { direction: tmpDir, breakpoint } ) )
        }
    })

    return breakPointAboutClsList
}

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