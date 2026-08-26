import { IBlog } from '../../app/interface/blog';
import { IBlogDeleteRequest } from '../../app/interface/request/deleteBlogRequest';
import { IGetAllUserBlogsRequest } from '../../app/interface/request/getAllUserBlogsRequest';
import { IRequestBlogById } from '../../app/interface/request/requestBlogById';
import {
  IAddCommentRequest,
  IApproveBlogRequest,
  IPublishBlogRequest,
  IRequestChangesRequest,
  ISubmitForReviewRequest,
} from '../../app/interface/request/reviewWorkflowRequest';
import { IUnsplashRequest } from '../../app/interface/request/unsplashRequest';
import api from '../axiosInstance';
import {
  ADD_REVIEW_COMMENT,
  APPROVE_BLOG,
  BLOG_SAVE,
  DELETE_BLOG,
  GET_ALL_BLOGS,
  GET_ALL_USER_BLOGS,
  GET_BLOG_BY_ID,
  PUBLISH_BLOG_FINAL,
  REQUEST_CHANGES,
  SUBMIT_FOR_REVIEW,
  UNSPLASH_API_URL,
} from '../endpoints';

export class blogService {
  static SaveBlog = async (request: IBlog) => {
    const response = await api.post(BLOG_SAVE, request);
    return response;
  };

  static getAllBlogs = async (request: { page: number; limit: number }) => {
    const response = await api.get(GET_ALL_BLOGS, {
      params: request,
    });
    return response;
  };

  static getAllUserBlogs = async (request: IGetAllUserBlogsRequest) => {
    const { userId, getDrafts, getPublished, page, limit } = request;
    const response = await api.get(GET_ALL_USER_BLOGS, {
      params: { userId, getDrafts, getPublished, page, limit },
    });
    return response;
  };

  static getBlogById = async (request: IRequestBlogById) => {
    const { blogId } = request;
    const response = await api.get(GET_BLOG_BY_ID(blogId));
    return response;
  };

  static deleteBlog = async (request: IBlogDeleteRequest) => {
    const { blogId } = request;
    const response = await api.delete(DELETE_BLOG(blogId));
    return response;
  };

  static FetchImageFromUnsplash = async (request: IUnsplashRequest) => {
    const { count, queryStrings } = request;
    const response = await api.get(UNSPLASH_API_URL, { params: { count, queryStrings } });
    return response;
  };

  static submitForReview = async (request: ISubmitForReviewRequest) => {
    const response = await api.post(SUBMIT_FOR_REVIEW, request);
    return response;
  };

  static approveBlog = async (request: IApproveBlogRequest) => {
    const response = await api.post(APPROVE_BLOG, request);
    return response;
  };

  static requestChanges = async (request: IRequestChangesRequest) => {
    const response = await api.post(REQUEST_CHANGES, request);
    return response;
  };

  static publishBlogFinal = async (request: IPublishBlogRequest) => {
    const response = await api.post(PUBLISH_BLOG_FINAL, request);
    return response;
  };

  static addReviewComment = async (request: IAddCommentRequest) => {
    const response = await api.post(ADD_REVIEW_COMMENT, request);
    return response;
  };
}
