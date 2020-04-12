interface PagiantionInfo {
    currentPage: number;
    pageSize: number;
    total: number;
    startPage: number;
}
export default function usePagination(initPagi: Partial<PagiantionInfo>): (((type: string, payload: any, pagination: PagiantionInfo) => {
    [x: string]: any;
    currentPage?: undefined;
} | {
    currentPage: number;
} | null) | {
    currentPage: number;
    pageSize: number;
    total: number;
    startPage: number;
    maxPage: number;
} | ((payload: any) => void))[];
export {};
