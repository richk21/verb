import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { alertToastReducer } from '../redux/alertToast/alertToastSlice';
import { notificationReducer } from '../redux/notification/notificationSlice';
import { orgMembersReducer } from '../redux/orgMembers/orgMembersSlice';
import { reportReducer } from '../redux/report/reportSlice';
import rootSaga from '../redux/rootSaga';
import { userReducer } from '../redux/user/userSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    report: reportReducer,
    alertToast: alertToastReducer,
    notification: notificationReducer,
    orgMembers: orgMembersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
