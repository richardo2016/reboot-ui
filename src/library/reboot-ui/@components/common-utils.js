import { themes, inputTypes, sizes } from "./common";

export function filterThemeName (theme = '') {
    if (themes.includes(theme)) return theme
}

export function filterSize (size = '') {
    if (sizes.includes(size)) return size
}

export function filterFormControlSize (size = '') {
    if (['sm', 'lg'].includes(size)) return size
}

export function filterPlaceholderSize (size = '') {
    if (['sm', 'lg'].includes(size)) return size
}

export function filterInputType (type = '') {
    if (inputTypes.includes(type)) return type
}

export function filterAxis (axis = '') {
    switch (axis) {
        default:
        case 'x':
        case 'h':
        case 'horizontal':
            axis = 'horizontal'
            break
        case 'y':
        case 'v':
        case 'vertical':
            axis = 'vertical'
            break
    }

    return axis
}