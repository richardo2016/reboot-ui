import React from 'react'

/**
 * @see https://usehooks.com/useKeyPress/
 */

function noop (evt: KeyboardEvent) {}
// Hook
export default function useKeyPress(
    targetKey: string,
    {
        /**
         * @recommended wrapped with React.useCallback 
         */
        keydown = noop,
        /**
         * @recommended wrapped with React.useCallback 
         */
        keyup = noop
    } = {}
) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = React.useState(false);

    // If pressed key is our target key then set to true
    const downHandler = (
        (nativeEvent: KeyboardEvent) => {
            if (nativeEvent.key === targetKey) {
                setKeyPressed(true);
                keydown(nativeEvent);
            }
        }
    )

    // If released key is our target key then set to false
    const upHandler = (
        (nativeEvent: KeyboardEvent) => {
            if (nativeEvent.key === targetKey) {
                setKeyPressed(false);
                keyup(nativeEvent);
            }
        }
    )

    // Add event listeners
    React.useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return keyPressed;
}