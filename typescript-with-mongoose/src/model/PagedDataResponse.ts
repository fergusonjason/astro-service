
export interface IPagedDataResponse<T> {
    result: T;
    start: number;
    stop: number;
    totalRecords: number;
}