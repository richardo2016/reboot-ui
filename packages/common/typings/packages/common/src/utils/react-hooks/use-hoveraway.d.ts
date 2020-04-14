import React from 'react';
export default function useHoveraway(hoveredElRef: React.MutableRefObject<HTMLElement | null>, { 
/**
 * @notice wrap it with `useCallback` recommended
 */
onAway: handlerAway, 
/**
 * @notice wrap it with `useCallback` recommended
 */
onIn: handlerIn, }?: {
    onAway?: EventListener | EventListenerObject | undefined;
    onIn?: EventListener | EventListenerObject | undefined;
}): void;
