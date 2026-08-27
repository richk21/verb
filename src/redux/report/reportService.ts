import { IReport } from '../../app/interface/report';
import { IReportDeleteRequest } from '../../app/interface/request/deleteReportRequest';
import { IGetAllUserReportsRequest } from '../../app/interface/request/getAllUserReportsRequest';
import { IRequestReportById } from '../../app/interface/request/requestReportById';
import {
  IAddCommentRequest,
  IApproveReportRequest,
  IPublishReportRequest,
  IRequestChangesRequest,
  ISubmitForReviewRequest,
} from '../../app/interface/request/reviewWorkflowRequest';
import { IUnsplashRequest } from '../../app/interface/request/unsplashRequest';
import api from '../axiosInstance';
import {
  ADD_REVIEW_COMMENT,
  APPROVE_REPORT,
  DELETE_REPORT,
  GET_ALL_REPORTS,
  GET_ALL_USER_REPORTS,
  GET_REPORT_BY_ID,
  PUBLISH_REPORT_FINAL,
  REPORT_SAVE,
  REQUEST_CHANGES,
  SUBMIT_FOR_REVIEW,
  UNSPLASH_API_URL,
} from '../endpoints';

export class reportService {
  static SaveReport = async (request: IReport) => {
    const response = await api.post(REPORT_SAVE, request);
    return response;
  };

  static getAllReports = async (request: { page: number; limit: number }) => {
    const response = await api.get(GET_ALL_REPORTS, {
      params: request,
    });
    return response;
  };

  static getAllUserReports = async (request: IGetAllUserReportsRequest) => {
    const { userId, getDrafts, getPublished, page, limit } = request;
    const response = await api.get(GET_ALL_USER_REPORTS, {
      params: { userId, getDrafts, getPublished, page, limit },
    });
    return response;
  };

  static getReportById = async (request: IRequestReportById) => {
    const { reportId } = request;
    const response = await api.get(GET_REPORT_BY_ID(reportId));
    return response;
  };

  static deleteReport = async (request: IReportDeleteRequest) => {
    const { reportId } = request;
    const response = await api.delete(DELETE_REPORT(reportId));
    return response;
  };

  static FetchImageFromUnsplash = async (request: IUnsplashRequest) => {
    const { count, queryStrings } = request;
    const response = await api.get(UNSPLASH_API_URL, { params: { count, queryStrings } });
    return response;
  };

  static submitForReview = async (request: ISubmitForReviewRequest) => {
    const response = await api.post(SUBMIT_FOR_REVIEW, request);
    return response;
  };

  static approveReport = async (request: IApproveReportRequest) => {
    const response = await api.post(APPROVE_REPORT, request);
    return response;
  };

  static requestChanges = async (request: IRequestChangesRequest) => {
    const response = await api.post(REQUEST_CHANGES, request);
    return response;
  };

  static publishReportFinal = async (request: IPublishReportRequest) => {
    const response = await api.post(PUBLISH_REPORT_FINAL, request);
    return response;
  };

  static addReviewComment = async (request: IAddCommentRequest) => {
    const response = await api.post(ADD_REVIEW_COMMENT, request);
    return response;
  };
}
