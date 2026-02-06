import axios from 'axios';
import { IBlog } from '../../app/interface/blog';
import { IBlogDeleteRequest } from '../../app/interface/request/deleteBlogRequest';
import { IGetAllUserBlogsRequest } from '../../app/interface/request/getAllUserBlogsRequest';
import { IRequestBlogById } from '../../app/interface/request/requestBlogById';
import { IUnsplashRequest } from '../../app/interface/request/unsplashRequest';
import { BLOG_SAVE, DELETE_BLOG, GET_ALL_BLOGS, GET_ALL_USER_BLOGS, GET_BLOG_BY_ID, UNSPLASH_API_URL } from '../endpoints';

export class blogService {

  static SaveBlog = async (request: IBlog) => {
    const response = await axios.post(BLOG_SAVE, request);
    return response;
  };

  static getAllBlogs = async (request: {page: number, limit: number}) => {
    const response = await axios.get(GET_ALL_BLOGS, {
      params: request
    });
    return response;
  }

  static getAllUserBlogs = async (request: IGetAllUserBlogsRequest) => {
    const {userId, getDrafts, getPublished, page, limit} = request;
    const response = await axios.get(GET_ALL_USER_BLOGS, {
      params: { userId, getDrafts, getPublished, page, limit }
    });
    return response;
  }

  static getBlogById = async (request: IRequestBlogById) => {
    const {blogId } = request;
    const response = await axios.get(GET_BLOG_BY_ID(blogId));
    return response;
  }

  static deleteBlog = async (request: IBlogDeleteRequest) => {
    const { blogId } = request;
    const response = await axios.delete(DELETE_BLOG(blogId));
    return response;
  }

  static FetchImageFromUnsplash = async (request: IUnsplashRequest) => {
    const { count, queryStrings } = request;
    const response = await axios.get(UNSPLASH_API_URL,{params: {count, queryStrings}});
    return response;
  }
}
