export interface PagiantionInfo {
    currentPage: number;
    pageSize: number;
    total: number;
    startPage: number;
}
declare const computePagination: (type: string, payload?: any, pagination?: Partial<PagiantionInfo> | undefined) => Partial<PagiantionInfo>;
export default function usePagination(initPagi?: Partial<PagiantionInfo>): [PagiantionInfo, (payload: any) => any, typeof computePagination];
export {};
