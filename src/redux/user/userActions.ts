import { createAction } from '@reduxjs/toolkit';
import { types } from '../../app/actionTypes';
import { ILoginRequest } from '../../app/interface/request/loginRequest';
import { ISignupRequest } from '../../app/interface/request/signupRequest';

export class UserActions {
  static SignUpUser = createAction<ISignupRequest>(types.USER_SIGNUP);
  static LoginUser = createAction<ILoginRequest>(types.USER_LOGIN);
  static UpdateUserInfo = createAction<FormData>(types.USER_UPDATE);
  static GetUserProfile = createAction<string>(types.GET_PROFILE);
  static LogoutUser = createAction(types.USER_LOGOUT);
}
