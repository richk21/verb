import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AlertToastType = 'success' | 'error' | 'warning' | 'info';

export interface IAlertToast {
  id: string;
  message: string;
  type: AlertToastType;
}

interface AlertToastState {
  alertToasts: IAlertToast[];
}

const initialState: AlertToastState = {
  alertToasts: [],
};

const alertToastSlice = createSlice({
  name: 'alertToast',
  initialState,
  reducers: {
    addAlertToast: (state, action: PayloadAction<Omit<IAlertToast, 'id'>>) => {
      state.alertToasts.push({
        ...action.payload,
        id: crypto.randomUUID(),
      });
    },

    removeAlertToast: (state, action: PayloadAction<string>) => {
      state.alertToasts = state.alertToasts.filter(
        (alertToast) => alertToast.id !== action.payload
      );
    },

    clearAlertToasts: (state) => {
      state.alertToasts = [];
    },
  },
});

export const { addAlertToast, removeAlertToast, clearAlertToasts } = alertToastSlice.actions;

export const alertToastReducer = alertToastSlice.reducer;
