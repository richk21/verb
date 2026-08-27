import { createAction } from '@reduxjs/toolkit';
import { types } from '../../app/actionTypes';
import { IReportDeleteRequest } from '../../app/interface/request/deleteReportRequest';
import { IGetAllUserReportsRequest } from '../../app/interface/request/getAllUserReportsRequest';
import { IReportState } from '../../app/interface/request/reportState';
import { IRequestReportById } from '../../app/interface/request/requestReportById';
import {
  IAddCommentRequest,
  IApproveReportRequest,
  IPublishReportRequest,
  IRequestChangesRequest,
  ISubmitForReviewRequest,
} from '../../app/interface/request/reviewWorkflowRequest';
import { IUnsplashRequest } from '../../app/interface/request/unsplashRequest';

export class ReportActions {
  static reportSave = createAction<IReportState>(types.REPORT_SAVE);
  static getAllReports = createAction<{ page: number; limit: number }>(types.GET_ALL_REPORTS);
  static getAllUserReports = createAction<IGetAllUserReportsRequest>(types.GET_USER_REPORTS);
  static getCurrentReportById = createAction<IRequestReportById>(types.GET_CURRENT_REPORT_BY_ID);
  static getReportById = createAction<IRequestReportById>(types.GET_REPORT_BY_ID);
  static reportDelete = createAction<IReportDeleteRequest>(types.REPORT_DELETE);
  static fetchImageFromUnsplash = createAction<IUnsplashRequest>(types.REPORT_GET_IMAGES_UNSPLASH);
  static submitForReview = createAction<ISubmitForReviewRequest>(types.SUBMIT_FOR_REVIEW);
  static approveReport = createAction<IApproveReportRequest>(types.APPROVE_REPORT);
  static requestChanges = createAction<IRequestChangesRequest>(types.REQUEST_CHANGES);
  static publishReportFinal = createAction<IPublishReportRequest>(types.PUBLISH_REPORT_FINAL);
  static addReviewComment = createAction<IAddCommentRequest>(types.ADD_REVIEW_COMMENT);
}
