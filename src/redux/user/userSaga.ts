import { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../app/actionTypes';
import { IGoogleAuthRequest } from '../../app/interface/request/googleAuthRequest';
import { ILoginRequest } from '../../app/interface/request/loginRequest';
import { ISignupRequest } from '../../app/interface/request/signupRequest';
import { ErrorResponse } from '../../app/interface/response/errorResponse';
import { IUser } from '../../app/interface/user';
import { addAlertToast } from '../alertToast/alertToastSlice';
import { userService } from './userService';
import { setLoading, setUser, setViewableUserProfile } from './userSlice';

export function* signUpUser(action: { type: string; payload: ISignupRequest }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{ message: string; user: IUser; token: string }> = yield call(
      userService.SignUpUser,
      action.payload
    );
    if (response.status == 201) {
      Cookies.set('token', response.data.token, { expires: 2, secure: true, sameSite: 'strict' });
      yield put(setUser(response.data.user));
      yield put(addAlertToast({ message: 'Signup successful', type: 'success' }));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({ message: err.response?.data.message || 'An error occurred', type: 'error' })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* loginUser(action: { type: string; payload: ILoginRequest }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{ message: string; user: IUser; token: string }> = yield call(
      userService.LoginUser,
      action.payload
    );
    if (response.status == 200) {
      Cookies.set('authToken', response.data.token, {
        expires: 2,
        secure: true,
        sameSite: 'strict',
      });
      yield put(setUser(response.data.user));
      yield put(addAlertToast({ message: 'Login successful', type: 'success' }));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({ message: err.response?.data.message || 'An error occurred', type: 'error' })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* googleAuthUser(action: { type: string; payload: IGoogleAuthRequest }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{ message: string; user: IUser; token: string }> = yield call(
      userService.GoogleAuthUser,
      action.payload
    );
    if (response.status == 200) {
      Cookies.set('authToken', response.data.token, {
        expires: 2,
        secure: true,
        sameSite: 'strict',
      });
      yield put(setUser(response.data.user));
      yield put(addAlertToast({ message: 'Google login successful', type: 'success' }));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({ message: err.response?.data.message || 'An error occurred', type: 'error' })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* getUserProfile(action: { type: string; payload: string }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call(
      userService.GetUserProfile,
      action.payload
    );
    if (response.status == 200 || response.status == 304) {
      yield put(setUser(response.data.user));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({ message: err.response?.data.message || 'An error occurred', type: 'error' })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* getViewableUserProfile(action: { type: string; payload: string }) {
  yield put(setLoading(true));
  console.log('ewjhejkwqhejkwqherkjwrhjkewr');
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call(
      userService.GetUserProfile,
      action.payload
    );
    console.log('saga', response.data.user);
    if (response.status == 200 || response.status == 304) {
      yield put(setViewableUserProfile(response.data.user));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({ message: err.response?.data.message || 'An error occurred', type: 'error' })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* updateUserInfo(action: { type: string; payload: FormData }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{ message: string; user: IUser }> = yield call(
      userService.UpdateUserInfo,
      action.payload
    );
    if (response.status == 200) {
      yield put(setUser(response.data.user));
      yield put(addAlertToast({ message: 'Profile updated successfully', type: 'success' }));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      addAlertToast({ message: err.response?.data.message || 'An error occurred', type: 'error' })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* userSaga() {
  yield takeLatest(types.USER_SIGNUP, signUpUser);
  yield takeLatest(types.USER_LOGIN, loginUser);
  yield takeLatest(types.GET_PROFILE, getUserProfile);
  yield takeLatest(types.USER_UPDATE, updateUserInfo);
  yield takeLatest(types.USER_AUTH_GOOGLE, googleAuthUser);
  yield takeLatest(types.GET_VIEWABLE_PROFILE, getViewableUserProfile);
}
