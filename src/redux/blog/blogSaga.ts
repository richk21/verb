import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../app/actionTypes';
import { IBlog } from '../../app/interface/blog';
import { IRequestBlogById } from '../../app/interface/request/requestBlogById';
import { ErrorResponse } from '../../app/interface/response/errorResponse';
import { blogService } from './blogService';
import { setAllBlogs, setAllBlogstotalCount, setBlog, setErrorMessage, setLoading } from './blogSlice';

export function* saveBlog(action: { type: string; payload: IBlog }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<IBlog> = yield call(blogService.SaveBlog, action.payload);
    if (response.status == 201) {
      yield put(setBlog(response.data));
      yield put(setErrorMessage(null));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setErrorMessage(err.response?.data.message || 'An error occurred'));
  } finally {
    yield put(setLoading(false));
  }
}

export function* getAllBlogs() {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{blogs: IBlog[], total: number}> = yield call(blogService.getAllBlogs);
    if (response.status == 200) {
      yield put(setAllBlogs(response.data.blogs));
      yield put(setAllBlogstotalCount(response.data.total));
      yield put(setErrorMessage(null));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setErrorMessage(err.response?.data.message || 'An error occurred while getting blogs'));
  } finally {
    yield put(setLoading(false));
  }
}

export function* getAllUserBlogs(action: { type: string; payload: number }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{blogs: IBlog[], total: number}> = yield call(blogService.getAllUserBlogs, action.payload);
    if (response.status == 200) {
      yield put(setAllBlogs(response.data.blogs));
      yield put(setAllBlogstotalCount(response.data.total));
      yield put(setErrorMessage(null));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setErrorMessage(err.response?.data.message || 'An error occurred while getting blogs'));
  } finally {
    yield put(setLoading(false));
  }
}

export function* getBlogById(action: { type: string; payload: IRequestBlogById }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<IBlog> = yield call(blogService.getBlogById, action.payload);
    if (response.status == 200) {
      yield put(setBlog(response.data));
      yield put(setErrorMessage(null));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setErrorMessage(err.response?.data.message || 'An error occurred while getting blogs'));
  } finally {
    yield put(setLoading(false));
  }
}


export function* blogSaga() {
  yield takeLatest(types.BLOG_SAVE, saveBlog);
  yield takeLatest(types.GET_ALL_BLOGS, getAllBlogs);
  yield takeLatest(types.GET_USER_BLOGS, getAllUserBlogs);
  yield takeLatest(types.GET_BLOG_BY_ID, getBlogById);
}
