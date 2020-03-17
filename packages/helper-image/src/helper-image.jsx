import React from 'react'
import { rclassnames } from '../../common'

export const PlaceholderImage = ({
    children = 'Image cap',
    label = children,
    rectProps = {},
    textProps = {},
    ...props
}) => {
    return (
        <svg
            class={rclassnames(props, [
            ])}
            focusable="false"
            role="img"
            width="100%"
            height="100"
            {...props}
            style={{
                textAnchor: 'middle',
                userSelect: 'none',
                ...props.style,
            }}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            aria-label={`Placeholder: ${label}`}
        >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#868e96" {...rectProps}></rect>
            <text x="50%" y="50%" fill="#dee2e6" dy=".3em" {...textProps}>{label}</text>
        </svg>
    )
}