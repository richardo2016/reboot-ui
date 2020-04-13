import React from 'react';
export default function useHoveraway(hoveredElRef: React.MutableRefObject<HTMLElement | null>, { 
/**
 * @notice wrap it with `useCallback` recommended
 */
onAway, 
/**
 * @notice wrap it with `useCallback` recommended
 */
onIn, }?: {
    onAway?: EventListener | EventListenerObject | undefined;
    onIn?: EventListener | EventListenerObject | undefined;
}): void;
