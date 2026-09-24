export interface ISubmitForReviewRequest {
  id: string;
  reviewerId: string;
}

export interface IApproveReportRequest {
  id: string;
}

export interface IRequestChangesRequest {
  id: string;
  comment: string;
}

export interface IPublishReportRequest {
  id: string;
}

export interface IAddCommentRequest {
  id: string;
  comment: string;
}

export interface IReplyToCommentRequest {
  id: string;
  commentId: string;
  text: string;
}
