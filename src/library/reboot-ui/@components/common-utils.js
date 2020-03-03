import { themes, inputTypes, sizes } from "./common";

export function filterThemeName (theme = '') {
    if (themes.includes(theme)) return theme
}

export function filterSize (size = '') {
    if (sizes.includes(size)) return size
}

export function filterInputType (type = '') {
    if (inputTypes.includes(type)) return type
}