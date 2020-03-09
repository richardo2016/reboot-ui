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

export const useFixupPopoverToken = (str = '') => {
  return `FIXUP_POPOVER_TOKEN$${str}`
}
/**
 * @see https://popper.js.org/docs/v2/modifiers/
 */
export const fixupPopoverModifier = {
    name: useFixupPopoverToken('fixup-popper-placement'),
    enabled: true,
    phase: 'main',
    effect: ({ state, options, name }) => {
        const { fixup } = options || {};

        const timer = setTimeout(() => {
            if (typeof fixup !== 'function') return ;

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

export function filterPopperTrigger (trigger) {
  switch (trigger) {
    case 'click':
    case 'hover':
      break
    default:
      trigger = 'click'
      break
  }

  return trigger
}

export function filterPlacement (placement = 'bottom-start') {
  return parsePlacement(placement).placement || 'bottom-start'
}

export function parsePlacement (placement = 'bottom-start') {
  let direction
  let axis

  switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
          direction = 'top';
          axis = 'vertical';
          break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
          direction = 'bottom';
          axis = 'vertical';
          break;
      case 'left':
      case 'left-start':
      case 'left-end':
          direction = 'left';
          axis = 'horizontal';
          break;
      case 'right':
      case 'right-start':
      case 'right-end':
          direction = 'right';
          axis = 'horizontal';
          break;
      default:
      // case 'auto':
      //     placement = 'auto'
      //     direction = 'auto'
      // case 'auto-start':
      // case 'auto-end':
      //     axis = 'auto'
          break
  }

  return {
      placement,
      direction,
      axis,
  }
}