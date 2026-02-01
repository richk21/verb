const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const SIGNUP_ENDPOINT = `${BASE_URL}/api/users/signup`;
export const LOGIN_ENDPOINT = `${BASE_URL}/api/users/login`;
export const UPDATE_USER_INFO_ENDPOINT = `${BASE_URL}/api/users/updateInfo`;
export const GET_USER_PROFILE_ENDPOINT = (id: string) => `${BASE_URL}/api/users/getProfile/${id}`;

export const UNSPLASH_API_URL = (count: number, title:string): string => `https://api.unsplash.com/photos/random?count=${count}&query=${title ? title.split(' ') : 'tech'}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY_API}`

export const BLOG_SAVE = `${BASE_URL}/api/blogs/save`;
export const GET_ALL_BLOGS = `${BASE_URL}/api/blogs/getAll`;
export const DELETE_BLOG = (id: string) => `${BASE_URL}/api/blogs/delete/${id}`;
export const GET_ALL_USER_BLOGS = `${BASE_URL}/api/blogs/getAllUserBlogs`;
export const GET_BLOG_BY_ID = (id: string )=> `${BASE_URL}/api/blogs/getById/${id}`;
