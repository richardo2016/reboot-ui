import { coerceInteger } from '@reboot-ui/common'

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
    if (typeof input === 'number' || VALID_OFFSET_ENUM_VALUES.includes(input)) input = { [numberAsKey]: input };

    const { span: spanValue, offset: offsetValue, rowCols } = input || {};

    return {
        $origInput: {
            span: spanValue,
            offset: offsetValue,
            rowCols: rowCols,
        },
        span: coerceResponsiveOfferValue(spanValue),
        offset: coerceResponsiveOfferValue(offsetValue),
        rowCols: coerceResponsiveOfferValue(rowCols),
    }
}

const VALID_OFFSET_ENUM_VALUES = ['auto'];
function coerceResponsiveOfferValue (value, fallbackValue) {
    if (VALID_OFFSET_ENUM_VALUES.includes(value)) return value

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
    
    return `${prefix}-${breakpoint ? `${breakpoint}-` : ''}${intOrEnumValue !== undefined ? intOrEnumValue : '' }`
}

export function getRowColsClsNameListFromBreakPointConfig ({
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

function isValidOffsetValue (value) {
    return typeof value === 'number' || VALID_OFFSET_ENUM_VALUES.includes(value)
}

export function getOffsetAboutClsNameListFromBreakPointConfig ({
    span = undefined,
    offset = undefined,

    ...input
}) {
    const breakPointAboutClsList = []

    if ((span = coerceResponsiveOfferValue(span)))
        breakPointAboutClsList.push( makeIntegerAboutClsFromBreakPointConfig('col', { value: span } ) )

    if ((offset = coerceResponsiveOfferValue(offset)))
        breakPointAboutClsList.push( makeIntegerAboutClsFromBreakPointConfig('offset', { value: offset } ) )

    let tmpResolved
    VALID_RESPONSIVE_BRKPOINT.forEach(breakpoint => {
        if (input[breakpoint]) {
            tmpResolved = resolveOffsetAboutBreakPointConfig(input[breakpoint], { numberAsKey: 'span' })

            if (tmpResolved.span || (tmpResolved.$origInput.span === 0))
                breakPointAboutClsList.push( makeIntegerAboutClsFromBreakPointConfig('col', { value: tmpResolved.span, breakpoint } ) )
            if (tmpResolved.offset || (tmpResolved.$origInput.offset === 0))
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