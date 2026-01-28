import axios from 'axios';
import { IBlog } from '../../app/interface/blog';
import { IRequestBlogById } from '../../app/interface/request/requestBlogById';
import { BLOG_SAVE, GET_ALL_BLOGS, GET_ALL_USER_BLOGS, GET_BLOG_BY_ID } from '../endpoints';

export class blogService {

  static SaveBlog = async (request: IBlog) => {
    const response = await axios.post(BLOG_SAVE, request);
    return response;
  };

  static getAllBlogs = async () => {
    const response = await axios.get(GET_ALL_BLOGS);
    return response;
  }

  static getAllUserBlogs = async (request: number) => {
    const response = await axios.get(GET_ALL_USER_BLOGS, {
      params: { userId: request }
    });
    return response;
  }

  static getBlogById = async (request: IRequestBlogById) => {
    const {blogId } = request;
    const response = await axios.get(GET_BLOG_BY_ID(blogId));
    return response;
  }
}
