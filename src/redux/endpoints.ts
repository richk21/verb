
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const SIGNUP_ENDPOINT = `${BASE_URL}/api/users/signup`;
export const LOGIN_ENDPOINT = `${BASE_URL}/api/users/login`;
export const GOOGLE_LOGIN_ENDPOINT = `${BASE_URL}/api/users/google-login`; 
export const UPDATE_USER_INFO_ENDPOINT = `${BASE_URL}/api/users/updateInfo`;
export const GET_USER_PROFILE_ENDPOINT = (id: string) => `${BASE_URL}/api/users/getProfile/${id}`;

export const UNSPLASH_API_URL = `${BASE_URL}/api/unsplash/getCoverImages`

export const BLOG_SAVE = `${BASE_URL}/api/blogs/save`;
export const GET_ALL_BLOGS = `${BASE_URL}/api/blogs/getAll`;
export const DELETE_BLOG = (id: string) => `${BASE_URL}/api/blogs/delete/${id}`;
export const GET_ALL_USER_BLOGS = `${BASE_URL}/api/blogs/getAllUserBlogs`;
export const GET_BLOG_BY_ID = (id: string )=> `${BASE_URL}/api/blogs/getById/${id}`;
