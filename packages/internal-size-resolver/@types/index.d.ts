import { RebootUI } from '@reboot-ui/common';
export declare function checkResponsiveBreakPoint(bk: RebootUI.BreakPointType): void;
declare type OFFSET_ENUM_VALUE = 'auto';
declare type OFFSET_ENUM_VALUE_TYPE = OFFSET_ENUM_VALUE | number | boolean;
export declare function getRowColsClsNameListFromBreakPointConfig({ rowCols, ...input }: {
    rowCols?: number;
} & RebootUI.BreakPointValues): string[];
export declare function getOffsetAboutClsNameListFromBreakPointConfig({ span, offset, ...input }: {
    span?: OFFSET_ENUM_VALUE_TYPE;
    offset?: OFFSET_ENUM_VALUE_TYPE;
} & RebootUI.BreakPointValues<OFFSET_ENUM_VALUE_TYPE>): string[];
export declare function getDirectionAboutClsNameListFromBreakPointConfig(prefix: string, input?: {
    direction?: RebootUI.DirectionType;
} & RebootUI.BreakPointValues): string[];
export {};
