export interface IGetAllUserReportsRequest {
  userId: string;
  getDrafts?: boolean;
  getPublished?: boolean;
  page: number;
  limit: number;
}
