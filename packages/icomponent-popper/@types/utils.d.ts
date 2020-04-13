import { Modifier, State, Options } from '@popperjs/core/lib';
export declare const useFixupPopoverToken: (str?: string) => string;
export declare type IPopperOptions = Partial<Options>;
export declare type FixupPopoverModifierConfig = {
    fixup: (ctx: {
        strategy: State['options']['strategy'];
        elements: State['elements'];
        expectedPlacement: State['options']['placement'];
        realPlacement: State['options']['placement'];
    }) => any;
};
/**
 * @see https://popper.js.org/docs/v2/modifiers/
 */
export declare const fixupPopoverModifier: Modifier<FixupPopoverModifierConfig>;
export declare const createPopup: (reference: Element | import("@popperjs/core/lib").VirtualElement, popper: HTMLElement, options?: Partial<Options> | undefined) => import("@popperjs/core/lib").Instance;
