import React from 'react';
declare type DocEle = Document | HTMLElement;
export default function useClickaway(clkEleRef: React.MutableRefObject<HTMLElement>, getTerminalElement?: (() => DocEle) | DocEle, { 
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
    clickAway?: EventListener | EventListenerObject | undefined;
    clickIn?: EventListener | EventListenerObject | undefined;
    stopPropagation?: boolean | undefined;
}): void;
export {};
