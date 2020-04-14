import React from 'react';
declare type DocEle = Document | HTMLElement;
export default function useClickaway(clkEleRef: React.MutableRefObject<HTMLElement | null>, getTerminalElement?: (() => DocEle) | DocEle, { 
/**
 * @notice wrap it with `useCallback` recommended
 */
clickAway, 
/**
 * @notice wrap it with `useCallback` recommended
 */
clickIn, 
/**
 * @description stop propagation when click in
 */
stopPropagation, }?: {
    clickAway?: (evt: MouseEvent) => any;
    clickIn?: (evt: MouseEvent) => any;
    stopPropagation?: boolean;
}): void;
export {};
