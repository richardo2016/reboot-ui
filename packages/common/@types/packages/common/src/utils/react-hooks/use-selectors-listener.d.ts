import { RebootUI } from '../../';
export default function useListenerDispose(elSelector: RebootUI.DOMSelector, event_name?: string, 
/**
 * @notice wrap it with `useCallback` recommended
 */
callback?: RebootUI.DOMEventHandler, deps?: any[]): void;
