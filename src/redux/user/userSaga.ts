import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../app/actionTypes';
import { ILoginRequest } from '../../app/interface/request/loginRequest';
import { ISignupRequest } from '../../app/interface/request/signupRequest';
import { ErrorResponse } from '../../app/interface/response/errorResponse';
import { IUser } from '../../app/interface/user';
import { userService } from './userService';
import { setErrorMessage, setLoading, setUser } from './userSlice';
import Cookies from 'js-cookie';

export function* signUpUser(action: { type: string; payload: ISignupRequest }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{message: string; user: IUser; token: string}> = yield call(userService.SignUpUser, action.payload);
    if (response.status == 201) {
      Cookies.set('token', response.data.token, { expires: 2, secure: true, sameSite: 'strict' });
      yield put(setUser(response.data.user));
      yield put(setErrorMessage(''));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setErrorMessage(err.response?.data.message || 'An error occurred'));
  } finally {
    yield put(setLoading(false));
  }
}

export function* loginUser(action: { type: string; payload: ILoginRequest }) {
  yield put(setLoading(true));
  try {
    const response: AxiosResponse<{message: string, user: IUser, token: string}> = yield call(userService.LoginUser, action.payload);
    if (response.status == 200) { 
      Cookies.set('authToken', response.data.token, { expires: 2, secure: true, sameSite: 'strict' });
      yield put(setUser(response.data.user));
      yield put(setErrorMessage(''));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setErrorMessage(err.response?.data.message || 'An error occurred'));
  } finally {
    yield put(setLoading(false));
  }
}

export function* userSaga() {
  yield takeLatest(types.USER_SIGNUP, signUpUser);
  yield takeLatest(types.USER_LOGIN, loginUser);
}
