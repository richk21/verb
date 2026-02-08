import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../app/actionTypes';
import {
  BLOG_PUBLISHED_MESSAGE,
  BLOG_SAVE_SUCCESS_MESSAGE,
  BLOGS_PER_PAGE,
} from '../../app/constants';
import { IBlog } from '../../app/interface/blog';
import { IBlogDeleteRequest } from '../../app/interface/request/deleteBlogRequest';
import { IGetAllUserBlogsRequest } from '../../app/interface/request/getAllUserBlogsRequest';
import { IRequestBlogById } from '../../app/interface/request/requestBlogById';
import { IUnsplashRequest } from '../../app/interface/request/unsplashRequest';
import { ErrorResponse } from '../../app/interface/response/errorResponse';
import { IUnsplashImagesResponse } from '../../app/interface/response/unsplashImagesResponse';
import { blogService } from './blogService';
import {
  setAllBlogs,
  setAllBlogstotalCount,
  setAllUserBlogs,
  setAllUserBlogsTotalCount,
  setBlog,
  setBlogSuccessMessage,
  setCurrentBlog,
  setErrorMessage,
  setLoading,
  setUnsplashErrorMessage,
  setUnsplashImages,
  setUnsplashImagesLoadingState,
  setUnsplashSuccessMessage,
} from './blogSlice';

export function* saveBlog(action: { type: string; payload: IBlog }) {
  yield put(setLoading(true));
  const { isDraft } = action.payload;
  try {
    const response: AxiosResponse<IBlog> = yield call(blogService.SaveBlog, action.payload);
    if (response.status == 201) {
      yield put(setCurrentBlog(response.data));
      yield put(setErrorMessage(null));
      if (action.payload.id === null) {
        const request: IRequestBlogById = { blogId: response.data.id };
        yield call(getBlogById, { type: types.GET_BLOG_BY_ID, payload: request });
      }
      yield put(
        setBlogSuccessMessage(isDraft ? BLOG_SAVE_SUCCESS_MESSAGE : BLOG_PUBLISHED_MESSAGE)
      );
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setErrorMessage(err.response?.data.message || 'An error occurred'));
  } finally {
    yield put(setLoading(false));
  }
}

export function* getAllBlogs(action: { type: string; payload: { page: number; limit: number } }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{ blogs: IBlog[]; total: number }> = yield call(
      blogService.getAllBlogs,
      action.payload
    );
    if (response.status == 200) {
      yield put(setAllBlogs({ blogs: response.data.blogs, page: action.payload.page }));
      yield put(setAllBlogstotalCount(response.data.total));
      yield put(setErrorMessage(null));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      setErrorMessage(err.response?.data.message || 'An error occurred while getting blogs')
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* getAllUserBlogs(action: { type: string; payload: IGetAllUserBlogsRequest }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{ blogs: IBlog[]; total: number }> = yield call(
      blogService.getAllUserBlogs,
      action.payload
    );
    if (response.status == 200) {
      yield put(setAllUserBlogs(response.data.blogs));
      yield put(setAllUserBlogsTotalCount(response.data.total));
      yield put(setErrorMessage(null));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      setErrorMessage(err.response?.data.message || 'An error occurred while getting blogs')
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* getCurrentBlogById(action: { type: string; payload: IRequestBlogById }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<IBlog> = yield call(blogService.getBlogById, action.payload);
    if (response.status == 200) {
      yield put(setCurrentBlog(response.data));
      yield put(setErrorMessage(null));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      setErrorMessage(err.response?.data.message || 'An error occurred while getting blogs')
    );
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
    yield put(
      setErrorMessage(err.response?.data.message || 'An error occurred while getting blogs')
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* deleteBlog(action: { type: string; payload: IBlogDeleteRequest }) {
  yield put(setLoading(true));
  const { userId } = action.payload;
  try {
    const response: AxiosResponse<boolean> = yield call(blogService.deleteBlog, action.payload);
    if (response.status == 200 && response.data == true) {
      yield put(setErrorMessage(null));
      yield call(getAllUserBlogs, {
        type: types.GET_USER_BLOGS,
        payload: { userId, getDrafts: false, getPublished: false, page: 1, limit: BLOGS_PER_PAGE },
      });
      yield put(setBlogSuccessMessage('Blog deleted.'));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      setErrorMessage(err.response?.data.message || 'An error occurred while deleting blog')
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* fetchImageFromUnsplash(action: { type: string; payload: IUnsplashRequest }) {
  yield put(setUnsplashImagesLoadingState(true));
  try {
    const response: AxiosResponse<IUnsplashImagesResponse | null> = yield call(
      blogService.FetchImageFromUnsplash,
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

export function* blogSaga() {
  yield takeLatest(types.BLOG_SAVE, saveBlog);
  yield takeLatest(types.GET_ALL_BLOGS, getAllBlogs);
  yield takeLatest(types.GET_USER_BLOGS, getAllUserBlogs);
  yield takeLatest(types.GET_CURRENT_BLOG_BY_ID, getCurrentBlogById);
  yield takeLatest(types.GET_BLOG_BY_ID, getBlogById);
  yield takeLatest(types.BLOG_DELETE, deleteBlog);
  yield takeLatest(types.BLOG_GET_IMAGES_UNSPLASH, fetchImageFromUnsplash);
}
