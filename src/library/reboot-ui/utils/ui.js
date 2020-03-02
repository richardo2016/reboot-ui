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

function resolveOffsetAboutBreakPointConfig (
    input,
    { numberAsKey = 'span' } = {}
) {
    if (typeof input === 'number') input = { [numberAsKey]: input };

    const { span: spanValue, offset: offsetValue, rowCols } = input || {};

    return {
        span: coerceInteger(spanValue, 0),
        offset: coerceInteger(offsetValue, 0),
        rowCols: coerceInteger(rowCols, 0),
    }
}

function makeIntegerAboutClsFromBreakPointConfig (prefix = 'col', { value: intValue, breakpoint = '' } = {}) {
    if (breakpoint)
        checkResponsiveBreakPoint(breakpoint)

    intValue = coerceInteger(intValue)
    
    switch (prefix) {
        case 'row-cols':
            break
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
            throw new Error(`[makeIntegerAboutClsFromBreakPointConfig] invalid make target ${prefix}!`)
    }
    
    return `${prefix}-${breakpoint ? `${breakpoint}-` : ''}${intValue}`
}

export function getDivisionAboutClsNameListFromBreakPointConfig ({
    rowCols,

    ...input
}) {
    const breakPointAboutClsList = []

    if (rowCols = coerceInteger(rowCols))
        breakPointAboutClsList.push( makeIntegerAboutClsFromBreakPointConfig('row-cols', { value: rowCols } ) )
    
    let tmpResolved
    VALID_RESPONSIVE_BRKPOINT.forEach(breakpoint => {
        if (input[breakpoint]) {
            tmpResolved = resolveOffsetAboutBreakPointConfig(input[breakpoint], { numberAsKey: 'rowCols' })
            if (tmpResolved.rowCols)
                breakPointAboutClsList.push( makeIntegerAboutClsFromBreakPointConfig('row-cols', { value: tmpResolved.rowCols, breakpoint } ) )
        }
    })

    return breakPointAboutClsList
}

export function getOffsetAboutClsNameListFromBreakPointConfig ({
    span = undefined,
    offset = undefined,

    ...input
}) {
    const breakPointAboutClsList = []

    if (span = coerceInteger(span))
        breakPointAboutClsList.push( makeIntegerAboutClsFromBreakPointConfig('col', { value: span } ) )

    if (offset = coerceInteger(offset))
        breakPointAboutClsList.push( makeIntegerAboutClsFromBreakPointConfig('offset', { value: offset } ) )

    let tmpResolved
    VALID_RESPONSIVE_BRKPOINT.forEach(breakpoint => {
        if (input[breakpoint]) {
            tmpResolved = resolveOffsetAboutBreakPointConfig(input[breakpoint])
            if (tmpResolved.span)
                breakPointAboutClsList.push( makeIntegerAboutClsFromBreakPointConfig('col', { value: tmpResolved.span, breakpoint } ) )
            if (tmpResolved.offset)
                breakPointAboutClsList.push( makeIntegerAboutClsFromBreakPointConfig('offset', { value: tmpResolved.offset, breakpoint } ) )
        }
    })

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

export function getDirectionAboutClsNameListFromBreakPointConfig (
    prefix,
    input = {}
) {
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