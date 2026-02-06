import { IGoogleAuthRequest } from '../../app/interface/request/googleAuthRequest';
import { ILoginRequest } from '../../app/interface/request/loginRequest';
import { ISignupRequest } from '../../app/interface/request/signupRequest';
import api from '../axiosInstance';
import { GET_USER_PROFILE_ENDPOINT, GOOGLE_LOGIN_ENDPOINT, LOGIN_ENDPOINT, SIGNUP_ENDPOINT, UPDATE_USER_INFO_ENDPOINT } from '../endpoints';

export class userService {
  static SignUpUser = async (request: ISignupRequest) => {
    const reponse = await api.post(SIGNUP_ENDPOINT, request);
    return reponse;
  };

  static LoginUser = async (request: ILoginRequest) => {
    const response = await api.post(LOGIN_ENDPOINT, request);
    return response;
  };

  static GoogleAuthUser = async (request: IGoogleAuthRequest) => {
    const response = await api.post(GOOGLE_LOGIN_ENDPOINT, request);
    return response;
  };

  static UpdateUserInfo = async (request: FormData) => {
    const response = await api.post(UPDATE_USER_INFO_ENDPOINT, request,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  };

  static GetUserProfile = async (id: string) => {
    const response = await api.get(GET_USER_PROFILE_ENDPOINT(id));
    return response;
  };
}
