import { breakpoints } from '../@data/data.json'

const brkHash = Array.from(breakpoints).reduce((prev, cur, idx) => {
    prev = prev || {};
    prev[cur.breakpoint] = cur
    return prev;
}, {})

import useWindowSize from '../../../utils/react-hooks/use-window-resize'

export default function useRebootBreakpoints (/* breakpoint */) {
    const { width } = useWindowSize()

    let breakpoint
    if ( width <= parseInt( brkHash.sm['min-width'] ) ) breakpoint = 'xs'
    else if ( width <= parseInt( brkHash.md['min-width'] ) ) breakpoint = 'sm'
    else if ( width <= parseInt( brkHash.lg['min-width'] ) ) breakpoint = 'md'
    else if ( width <= parseInt( brkHash.xl['min-width'] ) ) breakpoint = 'lg'
    else breakpoint = 'xl'

    return { width, config: brkHash[breakpoint], breakpoint }
}