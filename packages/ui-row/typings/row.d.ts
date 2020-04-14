/// <reference types="react" />
import { getRowColsClsNameListFromBreakPointConfig } from '@reboot-ui/internal-size-resolver';
import { RebootUI } from '@reboot-ui/common';
/**
 * @description
 * @see `.no-gutters`: https://getbootstrap.com/docs/4.4/layout/grid/#no-gutters
 *
 */
export default function Row({ children, as: _as, rowCols, sm, md, lg, xl, ...props }: RebootUI.IComponentPropsWithChildren<{} & Parameters<typeof getRowColsClsNameListFromBreakPointConfig>[0]>): JSX.Element;
