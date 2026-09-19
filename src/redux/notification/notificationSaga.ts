import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../app/actionTypes';
import { INotification } from '../../app/interface/notification';
import {
  IGetNotificationsRequest,
  IMarkAsReadRequest,
} from '../../app/interface/request/notificationRequest';
import { ErrorResponse } from '../../app/interface/response/errorResponse';
import { notificationService } from './notificationService';
import {
  markAllReadInPlace,
  markReadInPlace,
  setNotificationErrorMessage,
  setNotificationLoading,
  setNotifications,
  setUnreadCount,
} from './notificationSlice';

export function* getNotifications(action: { type: string; payload: IGetNotificationsRequest }) {
  yield put(setNotificationLoading(true));
  try {
    const response: AxiosResponse<{
      notifications: INotification[];
      total: number;
      unreadCount: number;
    }> = yield call(notificationService.GetNotifications, action.payload);
    if (response.status === 200) {
      yield put(setNotifications(response.data));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      setNotificationErrorMessage(err.response?.data.message || 'Failed to load notifications')
    );
  } finally {
    yield put(setNotificationLoading(false));
  }
}

export function* getUnreadCount() {
  try {
    const response: AxiosResponse<{ unreadCount: number }> = yield call(
      notificationService.GetUnreadCount
    );
    if (response.status === 200) {
      yield put(setUnreadCount(response.data.unreadCount));
    }
  } catch (error) {
    // Silent on purpose — a failed badge-count refresh shouldn't surface
    // an error toast on every navigation.
  }
}

export function* markAsRead(action: { type: string; payload: IMarkAsReadRequest }) {
  try {
    const response: AxiosResponse = yield call(notificationService.MarkAsRead, action.payload);
    if (response.status === 200) {
      yield put(markReadInPlace(action.payload));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setNotificationErrorMessage(err.response?.data.message || 'An error occurred'));
  }
}

export function* markAllAsRead() {
  try {
    const response: AxiosResponse = yield call(notificationService.MarkAllAsRead);
    if (response.status === 200) {
      yield put(markAllReadInPlace());
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setNotificationErrorMessage(err.response?.data.message || 'An error occurred'));
  }
}

export function* notificationSaga() {
  yield takeLatest(types.GET_NOTIFICATIONS, getNotifications);
  yield takeLatest(types.GET_UNREAD_COUNT, getUnreadCount);
  yield takeLatest(types.MARK_NOTIFICATION_READ, markAsRead);
  yield takeLatest(types.MARK_ALL_READ, markAllAsRead);
}
