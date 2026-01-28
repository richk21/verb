import axios from 'axios';
import { ILoginRequest } from '../../app/interface/request/loginRequest';
import { ISignupRequest } from '../../app/interface/request/signupRequest';
import { GET_USER_PROFILE_ENDPOINT, LOGIN_ENDPOINT, SIGNUP_ENDPOINT, UPDATE_USER_INFO_ENDPOINT } from '../endpoints';

export class userService {
  static SignUpUser = async (request: ISignupRequest) => {
    const reponse = await axios.post(SIGNUP_ENDPOINT, request);
    return reponse;
  };

  static LoginUser = async (request: ILoginRequest) => {
    const response = await axios.post(LOGIN_ENDPOINT, request);
    return response;
  };

  static UpdateUserInfo = async (request: FormData) => {
    const response = await axios.post(UPDATE_USER_INFO_ENDPOINT, request,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  };

  static GetUserProfile = async (id: string) => {
    const response = await axios.get(GET_USER_PROFILE_ENDPOINT(id));
    return response;
  };
}
