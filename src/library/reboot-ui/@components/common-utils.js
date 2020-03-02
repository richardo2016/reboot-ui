import { themes } from "./common";

export function filterThemeName (theme = '') {
    if (!themes.includes(theme)) return ''

    return theme
}