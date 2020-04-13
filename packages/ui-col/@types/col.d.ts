/// <reference types="react" />
import { getOffsetAboutClsNameListFromBreakPointConfig } from '@reboot-ui/internal-size-resolver';
import { RebootUI } from '@reboot-ui/common';
declare function Col({ children, as: _as, col, span, offset, 
/**
 * @break-config
 */
sm, 
/**
 * @break-config
 */
md, 
/**
 * @break-config
 */
lg, 
/**
 * @break-config
 */
xl, ...props }: RebootUI.IComponentPropsWithChildren<{
    col?: boolean;
} & Parameters<typeof getOffsetAboutClsNameListFromBreakPointConfig>[0]>): JSX.Element;
declare namespace Col {
    var useColClass: ({ span, offset, sm, md, lg, xl }?: {
        span?: number | boolean | "auto" | undefined;
        offset?: number | boolean | "auto" | undefined;
    } & RebootUI.BreakPointValues<number | boolean | "auto">) => string[];
}
export default Col;
