import { coerceInteger, RebootUI } from '@reboot-ui/common'

const VALID_RESPONSIVE_BRKPOINT: RebootUI.SizeType[] = [
    'sm',
    'md',
    'lg',
    'xl',
]

export function checkResponsiveBreakPoint (bk: RebootUI.BreakPointType) {
    if (!VALID_RESPONSIVE_BRKPOINT.includes(bk))
        throw new Error(`[checkResponsiveBreakPoint] invalid breakpoint ${bk}!`)
}

type OFFSET_ENUM_VALUE_TYPE_HOST = {
    span?: OFFSET_ENUM_VALUE_TYPE
    offset?: OFFSET_ENUM_VALUE_TYPE
    rowCols?: OFFSET_ENUM_VALUE_TYPE
}
function resolveOffsetAboutBreakPointConfig (
    _input?: OFFSET_ENUM_VALUE_TYPE | OFFSET_ENUM_VALUE_TYPE_HOST,
    { numberAsKey = 'span' } = {}
) {
    let input: Exclude<typeof _input, OFFSET_ENUM_VALUE_TYPE> = {};
    if (typeof _input === 'number' || VALID_OFFSET_ENUM_VALUES.includes(_input as any)) input = { [numberAsKey]: _input };

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

type OFFSET_ENUM_VALUE = 'auto'
type OFFSET_ENUM_VALUE_TYPE = OFFSET_ENUM_VALUE | number | boolean

const VALID_OFFSET_ENUM_VALUES: OFFSET_ENUM_VALUE[] = ['auto'];
function coerceResponsiveOfferValue (value?: OFFSET_ENUM_VALUE_TYPE, fallbackValue = undefined) {
    if (VALID_OFFSET_ENUM_VALUES.includes(value as any)) return value

    return coerceInteger(value, fallbackValue)
}

function makeIntegerAboutClsFromBreakPointConfig (
    prefix = 'col',
    {
        value: intOrEnumValue,
        breakpoint
    }: {
        value?: OFFSET_ENUM_VALUE_TYPE,
        breakpoint?: RebootUI.BreakPointType
    } = {}
) {
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
} : {
    rowCols?: number
} & RebootUI.BreakPointValues) {
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
} : {
    span?: OFFSET_ENUM_VALUE_TYPE
    offset?: OFFSET_ENUM_VALUE_TYPE
} & RebootUI.BreakPointValues<OFFSET_ENUM_VALUE_TYPE>) {
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

function filterResolveDirectionAboutBreakPointConfig (direction: any): RebootUI.DirectionType {
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

function makeDirectionAboutClsFromBreadkPointConfig (
    prefix = '',
    {
        direction,
        breakpoint
    } : {
        direction: RebootUI.DirectionType
        breakpoint?: RebootUI.BreakPointType
    }
) {
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
    prefix: string,
    input: {
        direction?: RebootUI.DirectionType
    } & RebootUI.BreakPointValues = {}
) {
    const breakPointAboutClsList = []

    let tmpDir: RebootUI.DirectionType
    if (input.direction) {
        tmpDir = filterResolveDirectionAboutBreakPointConfig(input.direction)
        if (tmpDir) breakPointAboutClsList.push( makeDirectionAboutClsFromBreadkPointConfig(prefix, { direction: tmpDir } ) )
    }

    VALID_RESPONSIVE_BRKPOINT.forEach(breakpoint => {
        if (input[breakpoint]) {
            tmpDir = filterResolveDirectionAboutBreakPointConfig(input[breakpoint])
            if (tmpDir)
                breakPointAboutClsList.push( makeDirectionAboutClsFromBreadkPointConfig(prefix, { direction: tmpDir, breakpoint } ) )
        }
    })

    return breakPointAboutClsList
}