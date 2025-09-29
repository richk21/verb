import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../app/actionTypes';
import { IBlogState } from '../../app/interface/request/blogState';
import { ErrorResponse } from '../../app/interface/response/errorResponse';
import { blogService } from './blogService';
import { setBlog, setErrorMessage, setLoading } from './blogSlice';

export function* publishBlog(action: { type: string; payload: IBlogState }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<IBlogState> = yield call(blogService.PublishBlog, action.payload);
    if (response.status == 201) {
      yield put(setBlog(response.data));
      yield put(setErrorMessage(''));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setErrorMessage(err.response?.data.message || 'An error occurred'));
  } finally {
    yield put(setLoading(false));
  }
}

export function* saveBlog(action: { type: string; payload: IBlogState }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<IBlogState> = yield call(blogService.SaveBlog, action.payload);
    if (response.status == 201) {
      yield put(setBlog(response.data));
      yield put(setErrorMessage(''));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setErrorMessage(err.response?.data.message || 'An error occurred'));
  } finally {
    yield put(setLoading(false));
  }
}

export function* blogSaga() {
  yield takeLatest(types.BLOG_PUBLISH, publishBlog);
  yield takeLatest(types.BLOG_SAVE_AS_DRAFT, saveBlog);
}
