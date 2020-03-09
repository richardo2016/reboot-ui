import React from 'react'
import { coerceInteger } from './_base'
import { arraify } from './_base'

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
        span: coerceResponsiveOfferValue(spanValue, 0),
        offset: coerceResponsiveOfferValue(offsetValue, 0),
        rowCols: coerceResponsiveOfferValue(rowCols, 0),
    }
}

function coerceResponsiveOfferValue (value, fallbackValue) {
    if (value === 'auto') return value

    return coerceInteger(value, fallbackValue)
}

function makeIntegerAboutClsFromBreakPointConfig (prefix = 'col', { value: intOrEnumValue, breakpoint = '' } = {}) {
    if (breakpoint)
        checkResponsiveBreakPoint(breakpoint)

    intOrEnumValue = coerceResponsiveOfferValue(intOrEnumValue)
    
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
    
    return `${prefix}-${breakpoint ? `${breakpoint}-` : ''}${intOrEnumValue}`
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

    if (span = coerceResponsiveOfferValue(span))
        breakPointAboutClsList.push( makeIntegerAboutClsFromBreakPointConfig('col', { value: span } ) )

    if (offset = coerceResponsiveOfferValue(offset))
        breakPointAboutClsList.push( makeIntegerAboutClsFromBreakPointConfig('offset', { value: offset } ) )

    let tmpResolved
    VALID_RESPONSIVE_BRKPOINT.forEach(breakpoint => {
        if (input[breakpoint]) {
            tmpResolved = resolveOffsetAboutBreakPointConfig(input[breakpoint], { numberAsKey: 'span' })
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

export function toggleCls (
    target = document.body || document.documentElement,
    classname,
    nextHas
) {
    classname = arraify(classname).filter(x => x && typeof x === 'string')

    classname.forEach(cls => {
        let _nextHas = nextHas
        if (_nextHas === undefined) {
            target.classList.toggle(cls)
            return ;
        }

        if (_nextHas) target.classList.add(cls)
        else target.classList.remove(cls)
    })
}