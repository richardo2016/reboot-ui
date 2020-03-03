import {
  popperGenerator,
  defaultModifiers,
} from '@popperjs/core/lib/popper-lite';

import cpm_flip from '@popperjs/core/lib/modifiers/flip';
import cpm_preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import cpm_offset from '@popperjs/core/lib/modifiers/offset';
import cpm_arrow from '@popperjs/core/lib/modifiers/arrow';

import { themes, inputTypes } from "./common";

export function filterThemeName (theme = '') {
    if (!themes.includes(theme)) return ''

    return theme
}

export function filterInputType (type = '') {
    if (!inputTypes.includes(type)) return ''
    
    return type
}

export const createPopup = popperGenerator({
  defaultModifiers: [
        ...defaultModifiers,
        cpm_flip,
        cpm_preventOverflow,
        cpm_offset,
        cpm_arrow,
    ],
});