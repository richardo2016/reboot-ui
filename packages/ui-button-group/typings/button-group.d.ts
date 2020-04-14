/// <reference types="react" />
import { RebootUI } from '@reboot-ui/common';
/**
 * @see https://getbootstrap.com/docs/4.4/components/button-group
 */
export default function ButtonGroup({ children, as: _as, size, vertical, toggle, ...props }: RebootUI.IComponentPropsWithChildren<{
    as?: RebootUI.IPropAs<'div'>;
    size?: RebootUI.BinarySizeType;
    vertical?: boolean;
    toggle?: boolean;
}>): JSX.Element;
