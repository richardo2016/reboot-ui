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

function resolveBreakPointConfig (input) {
    let { span: spanValue, offset: offsetValue } = input || {};

    return {
        span: coerceInteger(spanValue, 0),
        offset: coerceInteger(offsetValue, 0)
    }
}

function makeClassnameFromBreadkPointConfig (prefix = 'col', { value: intValue, breakpoint = '' } = {}) {
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
            throw new Error(`[makeBreadkPointConfigClassname] invalid make target ${prefix}!`)
    }
    
    return `${prefix}-${breakpoint ? `${breakpoint}-` : ''}${intValue}`
}

export function getClsNameListFromBreakPointConfig ({
    span = undefined,
    offset = undefined,

    sm = undefined,
    md = undefined,
    lg = undefined,
    xl = undefined,
}) {
    const breakPointAboutClsList = []

    if (span = coerceInteger(span))
        breakPointAboutClsList.push( makeClassnameFromBreadkPointConfig('col', { value: span } ) )

    if (offset = coerceInteger(offset))
        breakPointAboutClsList.push( makeClassnameFromBreadkPointConfig('offset', { value: offset } ) )

    let tmpResolved
    if (sm) {
        tmpResolved = resolveBreakPointConfig(sm)
        if (tmpResolved.span)
            breakPointAboutClsList.push( makeClassnameFromBreadkPointConfig('col', { value: tmpResolved.span, breakpoint: 'sm' } ) )
        if (tmpResolved.offset)
            breakPointAboutClsList.push( makeClassnameFromBreadkPointConfig('offset', { value: tmpResolved.offset, breakpoint: 'sm' } ) )
    }
    
    if (md) {
        tmpResolved = resolveBreakPointConfig(md)
        if (tmpResolved.span)
            breakPointAboutClsList.push( makeClassnameFromBreadkPointConfig('col', { value: tmpResolved.span, breakpoint: 'md' } ) )
        if (tmpResolved.offset)
            breakPointAboutClsList.push( makeClassnameFromBreadkPointConfig('offset', { value: tmpResolved.offset, breakpoint: 'md' } ) )
    }
    
    if (lg) {
        tmpResolved = resolveBreakPointConfig(lg)
        if (tmpResolved.span)
            breakPointAboutClsList.push( makeClassnameFromBreadkPointConfig('col', { value: tmpResolved.span, breakpoint: 'lg' } ) )
        if (tmpResolved.offset)
            breakPointAboutClsList.push( makeClassnameFromBreadkPointConfig('offset', { value: tmpResolved.offset, breakpoint: 'lg' } ) )
    }
    
    if (xl) {
        tmpResolved = resolveBreakPointConfig(xl)
        if (tmpResolved.span)
            breakPointAboutClsList.push( makeClassnameFromBreadkPointConfig('col', { value: tmpResolved.span, breakpoint: 'xl' } ) )
        if (tmpResolved.offset)
            breakPointAboutClsList.push( makeClassnameFromBreadkPointConfig('offset', { value: tmpResolved.offset, breakpoint: 'xl' } ) )
    }
    

    return breakPointAboutClsList
}

export function resolveJSXElement (
    inputJSXElement,
    {
        default: defaultValue = 'div',
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