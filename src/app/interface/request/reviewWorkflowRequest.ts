export interface ISubmitForReviewRequest {
  id: string;
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
