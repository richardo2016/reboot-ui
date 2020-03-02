import { themes, inputTypes } from "./common";

export function filterThemeName (theme = '') {
    if (!themes.includes(theme)) return ''

    return theme
}

export function filterInputType (type = '') {
    if (!inputTypes.includes(type)) return ''
    
    return type
}