const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const SIGNUP_ENDPOINT = `${BASE_URL}/api/users/signup`;
export const LOGIN_ENDPOINT = `${BASE_URL}/api/users/login`;
export const GOOGLE_LOGIN_ENDPOINT = `${BASE_URL}/api/users/google-auth`;
export const UPDATE_USER_INFO_ENDPOINT = `${BASE_URL}/api/users/updateInfo`;
export const GET_USER_PROFILE_ENDPOINT = (id: string) => `${BASE_URL}/api/users/getProfile/${id}`;

export const UNSPLASH_API_URL = `${BASE_URL}/api/unsplash/getCoverImages`;

export const REPORT_SAVE = `${BASE_URL}/api/reports/save`;
export const GET_ALL_REPORTS = `${BASE_URL}/api/reports/getAll`;
export const DELETE_REPORT = (id: string) => `${BASE_URL}/api/reports/delete/${id}`;
export const GET_ALL_USER_REPORTS = `${BASE_URL}/api/reports/getAllUserReports`;
export const GET_REPORT_BY_ID = (id: string) => `${BASE_URL}/api/reports/getById/${id}`;

export const SUBMIT_FOR_REVIEW = `${BASE_URL}/api/reports/submit-for-review`;
export const APPROVE_REPORT = `${BASE_URL}/api/reports/approve`;
export const REQUEST_CHANGES = `${BASE_URL}/api/reports/request-changes`;
export const PUBLISH_REPORT_FINAL = `${BASE_URL}/api/reports/publish-final`;
export const ADD_REVIEW_COMMENT = `${BASE_URL}/api/reports/comment`;
