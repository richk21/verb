import axios from 'axios';
import { ILoginRequest } from '../../app/interface/request/loginRequest';
import { ISignupRequest } from '../../app/interface/request/signupRequest';
import { LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from '../endpoints';

export class userService {
  static SignUpUser = async (request: ISignupRequest) => {
    const reponse = await axios.post(SIGNUP_ENDPOINT, request);
    return reponse;
  };

  static LoginUser = async (request: ILoginRequest) => {
    const response = await axios.post(LOGIN_ENDPOINT, request);
    return response;
  };
}
