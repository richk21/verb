import { RootState } from '../../app/store';

export const selectNotifications = (state: RootState) => state.notification.notifications;
