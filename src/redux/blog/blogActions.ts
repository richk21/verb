import { createAction } from '@reduxjs/toolkit';
import { types } from '../../app/actionTypes';
import { IBlogState } from '../../app/interface/request/blogState';
import { IBlogDeleteRequest } from '../../app/interface/request/deleteBlogRequest';
import { IGetAllUserBlogsRequest } from '../../app/interface/request/getAllUserBlogsRequest';
import { IRequestBlogById } from '../../app/interface/request/requestBlogById';
import { IUnsplashRequest } from '../../app/interface/request/unsplashRequest';

export class BlogActions {
  static blogSave = createAction<IBlogState>(types.BLOG_SAVE);
  static getAllBlogs = createAction<{page: number, limit: number}>(types.GET_ALL_BLOGS);
  static getAllUserBlogs = createAction<IGetAllUserBlogsRequest>(types.GET_USER_BLOGS);
  static getCurrentBlogById = createAction<IRequestBlogById>(types.GET_CURRENT_BLOG_BY_ID);
  static getBlogById = createAction<IRequestBlogById>(types.GET_BLOG_BY_ID);
  static blogDelete = createAction<IBlogDeleteRequest>(types.BLOG_DELETE);
  static fetchImageFromUnsplash = createAction<IUnsplashRequest>(types.BLOG_GET_IMAGES_UNSPLASH);
}
