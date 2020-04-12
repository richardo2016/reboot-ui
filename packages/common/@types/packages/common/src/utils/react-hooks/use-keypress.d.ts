/**
 * @see https://usehooks.com/useKeyPress/
 */
declare function noop(evt: KeyboardEvent): void;
export default function useKeyPress(targetKey: string, { 
/**
 * @recommended wrapped with React.useCallback
 */
keydown, 
/**
 * @recommended wrapped with React.useCallback
 */
keyup }?: {
    keydown?: typeof noop | undefined;
    keyup?: typeof noop | undefined;
}): boolean;
export {};
