export interface PageType<T> {
    pageSize: number;
    totalCount: number,
    totalPage: number,
    items: T[];
}