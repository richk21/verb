import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '../../app/interface/notification';
import { UserActions } from '../user/userActions';

interface NotificationState {
  notifications: INotification[];
  total: number;
  unreadCount: number;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  total: 0,
  unreadCount: 0,
  isLoading: false,
  errorMessage: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<{ notifications: INotification[]; total: number; unreadCount: number }>
    ) => {
      state.notifications = action.payload.notifications;
      state.total = action.payload.total;
      state.unreadCount = action.payload.unreadCount;
    },
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    markReadInPlace: (state, action: PayloadAction<{ id: string }>) => {
      const notification = state.notifications.find((n) => n.id === action.payload.id);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllReadInPlace: (state) => {
      state.notifications.forEach((n) => (n.read = true));
      state.unreadCount = 0;
    },
    setNotificationLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setNotificationErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserActions.LogoutUser, () => initialState);
  },
});

export const {
  setNotifications,
  setUnreadCount,
  markReadInPlace,
  markAllReadInPlace,
  setNotificationLoading,
  setNotificationErrorMessage,
} = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
