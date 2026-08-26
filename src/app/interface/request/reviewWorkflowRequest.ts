export interface ISubmitForReviewRequest {
  id: string;
}

export interface IApproveBlogRequest {
  id: string;
}

export interface IRequestChangesRequest {
  id: string;
  comment: string;
}

export interface IPublishBlogRequest {
  id: string;
}

export interface IAddCommentRequest {
  id: string;
  comment: string;
}
