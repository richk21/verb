const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const SIGNUP_ENDPOINT = `${BASE_URL}/api/users/signup`;
export const LOGIN_ENDPOINT = `${BASE_URL}/api/users/login`;

export const UNSPLASH_API_URL = (count: number, title:string): string => `https://api.unsplash.com/photos/random?count=${count}&query=${title ? title.split(' ') : 'tech'}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY_API}`

export const BLOG_PUBLISH = ``;
export const BLOG_SAVE = ``;
