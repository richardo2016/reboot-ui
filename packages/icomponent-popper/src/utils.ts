import {
    popperGenerator,
    defaultModifiers,
} from '@popperjs/core/lib/popper-lite';

import cpm_flip from '@popperjs/core/lib/modifiers/flip';
import cpm_preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import cpm_offset from '@popperjs/core/lib/modifiers/offset';
import cpm_arrow from '@popperjs/core/lib/modifiers/arrow';
import cpm_computeStyles from '@popperjs/core/lib/modifiers/computeStyles';
import cpm_applyStyles from '@popperjs/core/lib/modifiers/applyStyles';

import { Modifier, State, Options } from '@popperjs/core/lib';

export const useFixupPopoverToken = (str = '') => {
    // return `FIXUP_POPOVER_TOKEN$${str}`
    return `FIXUP_POPOVER_TOKEN$${'fixup-popper-placement'}`
}

export type IPopperOptions = Partial<Options>
export type FixupPopoverModifierConfig = {
    fixup: (ctx: {
        strategy: State['options']['strategy']
        elements: State['elements']
        expectedPlacement: State['options']['placement']
        realPlacement: State['options']['placement']
    }) => any
}
/**
 * @see https://popper.js.org/docs/v2/modifiers/
 */
export const fixupPopoverModifier: Modifier<FixupPopoverModifierConfig> = {
    name: useFixupPopoverToken('fixup-popper-placement'),
    enabled: true,
    phase: 'main',
    fn: (args) => void 0,
    effect: ({ state, options, name }) => {
        const { fixup } = options || {};

        const timer = setTimeout(() => {
            if (typeof fixup !== 'function') return;

            fixup({
                strategy: state.options.strategy,
                elements: state.elements,
                expectedPlacement: state.options.placement,
                realPlacement: state.placement,
            })
        }, 0)

        return () => {
            clearTimeout(timer)
        }
    },
    requires: ['arrow']
}

export const createPopup = popperGenerator({
    defaultModifiers: [
        ...defaultModifiers,
        cpm_flip,
        cpm_preventOverflow,
        cpm_offset,
        cpm_arrow,
        cpm_computeStyles,
        cpm_applyStyles,
        fixupPopoverModifier,
    ],
});