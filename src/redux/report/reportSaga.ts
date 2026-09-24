import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../app/actionTypes';
import {
  REPORT_PUBLISHED_MESSAGE,
  REPORT_SAVE_SUCCESS_MESSAGE,
  REPORTS_PER_PAGE,
} from '../../app/constants';
import { IReport } from '../../app/interface/report';
import { IReportDeleteRequest } from '../../app/interface/request/deleteReportRequest';
import { IGetAllUserReportsRequest } from '../../app/interface/request/getAllUserReportsRequest';
import { IRequestReportById } from '../../app/interface/request/requestReportById';
import {
  IAddCommentRequest,
  IApproveReportRequest,
  IPublishReportRequest,
  IReplyToCommentRequest,
  IRequestChangesRequest,
  ISubmitForReviewRequest,
} from '../../app/interface/request/reviewWorkflowRequest';
import { IUnsplashRequest } from '../../app/interface/request/unsplashRequest';
import { ErrorResponse } from '../../app/interface/response/errorResponse';
import { IUnsplashImagesResponse } from '../../app/interface/response/unsplashImagesResponse';
import { addAlertToast } from '../alertToast/alertToastSlice';
import { ReportActions } from './reportActions';
import { reportService } from './reportService';
import {
  setAllReports,
  setAllReportstotalCount,
  setAllUserReports,
  setAllUserReportsTotalCount,
  setCurrentReport,
  setErrorMessage,
  setLoading,
  setReport,
  setUnsplashImages,
  setUnsplashImagesLoadingState,
} from './reportSlice';

export function* saveReport(action: { type: string; payload: IReport }) {
  yield put(setLoading(true));
  const { isDraft } = action.payload;
  try {
    const response: AxiosResponse<IReport> = yield call(reportService.SaveReport, action.payload);
    if (response.status === 200 || response.status === 201) {
      yield put(setCurrentReport(response.data));
      yield put(setErrorMessage(null));
      if (action.payload.id === null) {
        const request: IRequestReportById = { reportId: response.data.id };
        yield call(getReportById, { type: types.GET_REPORT_BY_ID, payload: request });
      }
      yield put(
        addAlertToast({
          message: isDraft ? REPORT_SAVE_SUCCESS_MESSAGE : REPORT_PUBLISHED_MESSAGE,
          type: 'success',
        })
      );
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({ message: err.response?.data.message || 'An error occurred', type: 'error' })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* getAllReports(action: { type: string; payload: { page: number; limit: number } }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{ reports: IReport[]; total: number }> = yield call(
      reportService.getAllReports,
      action.payload
    );
    if (response.status == 200) {
      yield put(setAllReports({ reports: response.data.reports, page: action.payload.page }));
      yield put(setAllReportstotalCount(response.data.total));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({
        message: err.response?.data.message || 'An error occurred while getting reports',
        type: 'error',
      })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* getAllUserReports(action: { type: string; payload: IGetAllUserReportsRequest }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{ reports: IReport[]; total: number }> = yield call(
      reportService.getAllUserReports,
      action.payload
    );
    if (response.status == 200) {
      yield put(setAllUserReports(response.data.reports));
      yield put(setAllUserReportsTotalCount(response.data.total));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({
        message: err.response?.data.message || 'An error occurred while getting reports',
        type: 'error',
      })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* getCurrentReportById(action: { type: string; payload: IRequestReportById }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<IReport> = yield call(
      reportService.getReportById,
      action.payload
    );
    if (response.status == 200) {
      yield put(setCurrentReport(response.data));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({
        message: err.response?.data.message || 'An error occurred while getting reports',
        type: 'error',
      })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* getReportById(action: { type: string; payload: IRequestReportById }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<IReport> = yield call(
      reportService.getReportById,
      action.payload
    );
    if (response.status == 200) {
      yield put(setReport(response.data));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({
        message: err.response?.data.message || 'An error occurred while getting reports',
        type: 'error',
      })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* deleteReport(action: { type: string; payload: IReportDeleteRequest }) {
  yield put(setLoading(true));
  const { userId } = action.payload;
  try {
    const response: AxiosResponse<boolean> = yield call(reportService.deleteReport, action.payload);
    if (response.status == 200 && response.data == true) {
      yield put(setErrorMessage(null));
      // Refresh the user's reports list after deletion. Dispatch the standard action
      // so the watcher handles it and the UI is updated.
      yield put(
        ReportActions.getAllUserReports({
          userId,
          getDrafts: true,
          getPublished: true,
          page: 1,
          limit: REPORTS_PER_PAGE,
        })
      );
      yield put(
        addAlertToast({
          message: 'Report deleted.',
          type: 'success',
        })
      );
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({
        message: err.response?.data.message || 'An error occurred while deleting report',
        type: 'error',
      })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* fetchImageFromUnsplash(action: { type: string; payload: IUnsplashRequest }) {
  yield put(setUnsplashImagesLoadingState(true));
  try {
    const response: AxiosResponse<IUnsplashImagesResponse | null> = yield call(
      reportService.FetchImageFromUnsplash,
      action.payload
    );
    if (response.status == 200 && response.data?.images) {
      yield put(setErrorMessage(null));
      yield put(setUnsplashImages(response.data?.images));
      yield put(
        addAlertToast({
          message: 'Unsplash images are ready!',
          type: 'success',
        })
      );
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({
        message: err.response?.data.message || 'Failed to fetch images from Unsplash',
        type: 'error',
      })
    );
  } finally {
    yield put(setUnsplashImagesLoadingState(false));
  }
}

export function* submitForReview(action: { type: string; payload: ISubmitForReviewRequest }) {
  try {
    const response: AxiosResponse = yield call(reportService.submitForReview, action.payload);
    yield put(setReport(response.data));
    yield put(
      addAlertToast({
        message: 'Submitted for review',
        type: 'success',
      })
    );
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(
      addAlertToast({
        message: err.response?.data.message || 'Failed to submit for review',
        type: 'error',
      })
    );
  }
}

export function* approveReport(action: { type: string; payload: IApproveReportRequest }) {
  try {
    const response: AxiosResponse = yield call(reportService.approveReport, action.payload);
    yield put(setReport(response.data));
    yield put(
      addAlertToast({
        message: 'Report has been approved',
        type: 'success',
      })
    );
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(
      addAlertToast({
        message: err.response?.data.message || 'Failed to approve report',
        type: 'error',
      })
    );
  }
}

export function* requestChanges(action: { type: string; payload: IRequestChangesRequest }) {
  try {
    const response: AxiosResponse = yield call(reportService.requestChanges, action.payload);
    yield put(setReport(response.data));
    yield put(
      addAlertToast({
        message: 'Changes requested for report',
        type: 'success',
      })
    );
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(
      addAlertToast({
        message: err.response?.data.message || 'Failed to request changes',
        type: 'error',
      })
    );
  }
}

export function* publishReportFinal(action: { type: string; payload: IPublishReportRequest }) {
  try {
    const response: AxiosResponse = yield call(reportService.publishReportFinal, action.payload);
    yield put(setReport(response.data));
    yield put(
      addAlertToast({
        message: 'Report has been published',
        type: 'success',
      })
    );
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(
      addAlertToast({
        message: err.response?.data.message || 'Failed to publish report',
        type: 'error',
      })
    );
  }
}

export function* addReviewComment(action: { type: string; payload: IAddCommentRequest }) {
  try {
    const response: AxiosResponse = yield call(reportService.addReviewComment, action.payload);
    yield put(setReport(response.data));
    yield put(
      addAlertToast({
        message: 'Comment added',
        type: 'success',
      })
    );
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(
      addAlertToast({
        message: err.response?.data.message || 'Failed to add the comment',
        type: 'error',
      })
    );
  }
}

export function* replyToComment(action: { type: string; payload: IReplyToCommentRequest }) {
  try {
    const response: AxiosResponse = yield call(reportService.replyToComment, action.payload);
    yield put(setReport(response.data));
    yield put(
      addAlertToast({
        message: 'Reply sent',
        type: 'success',
      })
    );
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(
      addAlertToast({
        message: err.response?.data.message || 'Failed to send reply',
        type: 'error',
      })
    );
  }
}

export function* reportSaga() {
  yield takeLatest(types.REPORT_SAVE, saveReport);
  yield takeLatest(types.GET_ALL_REPORTS, getAllReports);
  yield takeLatest(types.GET_USER_REPORTS, getAllUserReports);
  yield takeLatest(types.GET_CURRENT_REPORT_BY_ID, getCurrentReportById);
  yield takeLatest(types.GET_REPORT_BY_ID, getReportById);
  yield takeLatest(types.REPORT_DELETE, deleteReport);
  yield takeLatest(types.REPORT_GET_IMAGES_UNSPLASH, fetchImageFromUnsplash);
  yield takeLatest(types.SUBMIT_FOR_REVIEW, submitForReview);
  yield takeLatest(types.APPROVE_REPORT, approveReport);
  yield takeLatest(types.REQUEST_CHANGES, requestChanges);
  yield takeLatest(types.PUBLISH_REPORT_FINAL, publishReportFinal);
  yield takeLatest(types.ADD_REVIEW_COMMENT, addReviewComment);
  yield takeLatest(types.ADD_REVIEW_REPLY, replyToComment);
}
