import { createAction } from '@reduxjs/toolkit';
import { types } from '../../app/actionTypes';
import {
  IGetNotificationsRequest,
  IMarkAsReadRequest,
} from '../../app/interface/request/notificationRequest';

export class NotificationActions {
  static getNotifications = createAction<IGetNotificationsRequest>(types.GET_NOTIFICATIONS);
  static getUnreadCount = createAction(types.GET_UNREAD_COUNT);
  static markAsRead = createAction<IMarkAsReadRequest>(types.MARK_NOTIFICATION_READ);
  static markAllAsRead = createAction(types.MARK_ALL_READ);
}
