export interface PagedList<T> {
    items: T[]
    page: number
    pageSize: number
    search: String;
    totalPage: number
}
