
export interface IPagedDataResponse<T> {

    result: T[];
    offset: number;
    limit: number;
    recordCount: number;
}