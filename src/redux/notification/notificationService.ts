import {
  IGetNotificationsRequest,
  IMarkAsReadRequest,
} from '../../app/interface/request/notificationRequest';
import api from '../axiosInstance';
import {
  GET_NOTIFICATIONS,
  GET_UNREAD_COUNT,
  MARK_ALL_READ,
  MARK_NOTIFICATION_READ,
} from '../endpoints';

export class notificationService {
  static GetNotifications = async (request: IGetNotificationsRequest) => {
    const response = await api.get(GET_NOTIFICATIONS, { params: request });
    return response;
  };

  static GetUnreadCount = async () => {
    const response = await api.get(GET_UNREAD_COUNT);
    return response;
  };

  static MarkAsRead = async (request: IMarkAsReadRequest) => {
    const response = await api.patch(MARK_NOTIFICATION_READ(request.id), {});
    return response;
  };

  static MarkAllAsRead = async () => {
    const response = await api.patch(MARK_ALL_READ, {});
    return response;
  };
}
