export interface PaginationInfo {
    currentPage: number;
    pageSize: number;
    total: number;
    startPage: number;
}
declare const computePagination: (type: string, payload?: any, pagination?: Partial<PaginationInfo> | undefined) => Partial<PaginationInfo>;
export default function usePagination(initPagi?: Partial<PaginationInfo>): [PaginationInfo, (payload: any) => any, typeof computePagination];
export {};
