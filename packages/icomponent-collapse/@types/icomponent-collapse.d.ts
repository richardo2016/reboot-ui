/// <reference types="react" />
import { RebootUI } from '@reboot-ui/common';
/**
 * @notice this funciton is designed for `React.forwardRef`, wrap it before using it
 */
export default function CollapseProto({ children, as: _as, collapse: propCollapsed, onEntering, onEntered, onExit, onExiting, onExited, ...props }: RebootUI.IComponentPropsWithChildren<{
    collapse?: boolean;
    onEntering?: (node: HTMLElement, isAppearing: boolean) => void;
    onEntered?: (node: HTMLElement, isAppearing: boolean) => void;
    onExit?: (node: HTMLElement) => void;
    onExiting?: (node: HTMLElement) => void;
    onExited?: (node: HTMLElement) => void;
}>, ref?: RebootUI.ReactRef): JSX.Element;
