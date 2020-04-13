import React from 'react'

import {
    resolveJSXElement,
    RebootUI,
    rclassnames,
    coerceFloat,
    filterThemeName
} from '@reboot-ui/common'

/**
 * @see https://getbootstrap.com/docs/4.4/components/progress/
 * 
 * @inner-content `.progress-bar`
 * @inner-content `.progress-bar-striped`
 * @inner-content `.progress-bar-animated`
 */
const Progress = function ({
    children,
    as: _as = 'div',
    ...props
}: RebootUI.IComponentPropsWithChildren) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                "progress"
            ])}
        >
            {children}
        </JSXEl>
    )
}

function formatValue (value: any, minnmal = 0) {
    return Math.max(coerceFloat(value), minnmal)
}

Progress.Bar = function ({
    children,
    as: _as = 'div',
    value = 50,
    min = 0,
    max = 100,
    label = children,
    bgTheme,
    striped = false,
    animated = false,
    ...props
}: RebootUI.IComponentPropsWithChildren<{
    value?: number
    min?: number
    max?: number
    label?: React.ReactNode
    bgTheme?: RebootUI.ThemeType
    striped?: boolean
    animated?: boolean
}>) {
    const JSXEl = resolveJSXElement(_as, { /* allowedHTMLTags: [] */ });

    min = formatValue(min)
    max = formatValue(max)
    value = formatValue(value)

    if (value < min && value > max)
        value = min

    const percentage = formatValue(value / (max - min) * 100)

    bgTheme = filterThemeName(bgTheme)

    return (
        <JSXEl
            {...props}
            className={rclassnames(props, [
                "progress-bar",
                bgTheme && `bg-${bgTheme}`,
                striped && `progress-bar-striped`,
                animated && `progress-bar-animated`,
            ])}
            role="progressbar"
            aria-valuenow={value} 
            aria-valuemin={min}
            aria-valuemax={max}
            style={{
                width: `${percentage}%`,
                ...props.style,
            }}
        >
            {label}
        </JSXEl>
    )
}

export default Progress