import { RootState } from '../../app/store';

export const selectNotifications = (state: RootState) => state.notification.notifications;
export const selectNotificationsTotal = (state: RootState) => state.notification.total;
export const selectUnreadCount = (state: RootState) => state.notification.unreadCount;
export const selectNotificationsLoading = (state: RootState) => state.notification.isLoading;
export const selectNotificationErrorMessage = (state: RootState) => state.notification.errorMessage;
