export interface IGetAllUserBlogsRequest {
    userId: string;
    getDrafts?: boolean;
    getPublished?: boolean;
    page: number;
    limit: number;
}