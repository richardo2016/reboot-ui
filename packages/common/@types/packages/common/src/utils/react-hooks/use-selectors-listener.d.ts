declare function noop(): void;
export default function useListenerDispose(elSelector: string, event_name?: string, 
/**
 * @notice wrap it with `useCallback` recommended
 */
callback?: typeof noop, deps?: never[]): void;
export {};
