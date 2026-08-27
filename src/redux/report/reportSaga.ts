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
  IRequestChangesRequest,
  ISubmitForReviewRequest,
} from '../../app/interface/request/reviewWorkflowRequest';
import { IUnsplashRequest } from '../../app/interface/request/unsplashRequest';
import { ErrorResponse } from '../../app/interface/response/errorResponse';
import { IUnsplashImagesResponse } from '../../app/interface/response/unsplashImagesResponse';
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
  setReportSuccessMessage,
  setUnsplashErrorMessage,
  setUnsplashImages,
  setUnsplashImagesLoadingState,
  setUnsplashSuccessMessage,
} from './reportSlice';

export function* saveReport(action: { type: string; payload: IReport }) {
  yield put(setLoading(true));
  const { isDraft } = action.payload;
  try {
    const response: AxiosResponse<IReport> = yield call(reportService.SaveReport, action.payload);
    if (response.status == 201) {
      yield put(setCurrentReport(response.data));
      yield put(setErrorMessage(null));
      if (action.payload.id === null) {
        const request: IRequestReportById = { reportId: response.data.id };
        yield call(getReportById, { type: types.GET_REPORT_BY_ID, payload: request });
      }
      yield put(
        setReportSuccessMessage(isDraft ? REPORT_SAVE_SUCCESS_MESSAGE : REPORT_PUBLISHED_MESSAGE)
      );
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setErrorMessage(err.response?.data.message || 'An error occurred'));
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
      yield put(setErrorMessage(null));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      setErrorMessage(err.response?.data.message || 'An error occurred while getting reports')
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
      yield put(setErrorMessage(null));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      setErrorMessage(err.response?.data.message || 'An error occurred while getting reports')
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
      yield put(setErrorMessage(null));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      setErrorMessage(err.response?.data.message || 'An error occurred while getting reports')
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
      yield put(setErrorMessage(null));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      setErrorMessage(err.response?.data.message || 'An error occurred while getting reports')
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
      yield call(getAllUserReports, {
        type: types.GET_USER_REPORTS,
        payload: {
          userId,
          getDrafts: false,
          getPublished: false,
          page: 1,
          limit: REPORTS_PER_PAGE,
        },
      });
      yield put(setReportSuccessMessage('Report deleted.'));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      setErrorMessage(err.response?.data.message || 'An error occurred while deleting report')
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
      yield put(setUnsplashSuccessMessage('Unsplash images are ready!'));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      setUnsplashErrorMessage(err.response?.data.message || 'Failed to fetch images from Unsplash')
    );
  } finally {
    yield put(setUnsplashImagesLoadingState(false));
  }
}

export function* submitForReview(action: { type: string; payload: ISubmitForReviewRequest }) {
  try {
    const response: AxiosResponse = yield call(reportService.submitForReview, action.payload);
    yield put(setReport(response.data));
    yield put(setReportSuccessMessage('Submitted for review'));
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(setErrorMessage(err.response?.data.message || 'Failed to submit for review'));
  }
}

export function* approveReport(action: { type: string; payload: IApproveReportRequest }) {
  try {
    const response: AxiosResponse = yield call(reportService.approveReport, action.payload);
    yield put(setReport(response.data));
    yield put(setReportSuccessMessage('Report has been approved'));
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(setErrorMessage(err.response?.data.message || 'Failed to approve report'));
  }
}

export function* requestChanges(action: { type: string; payload: IRequestChangesRequest }) {
  try {
    const response: AxiosResponse = yield call(reportService.requestChanges, action.payload);
    yield put(setReport(response.data));
    yield put(setReportSuccessMessage('Changes requested for report'));
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(setErrorMessage(err.response?.data.message || 'Failed to request changes'));
  }
}

export function* publishReportFinal(action: { type: string; payload: IPublishReportRequest }) {
  try {
    const response: AxiosResponse = yield call(reportService.publishReportFinal, action.payload);
    yield put(setReport(response.data));
    yield put(setReportSuccessMessage('Report has been published'));
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(setErrorMessage(err.response?.data.message || 'Failed to publish report'));
  }
}

export function* addReviewComment(action: { type: string; payload: IAddCommentRequest }) {
  try {
    const response: AxiosResponse = yield call(reportService.addReviewComment, action.payload);
    yield put(setReport(response.data));
    yield put(setReportSuccessMessage('Comment added'));
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(setErrorMessage(err.response?.data.message || 'Failed to add the comment'));
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
}
