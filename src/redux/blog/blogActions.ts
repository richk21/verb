import { createAction } from '@reduxjs/toolkit';
import { types } from '../../app/actionTypes';
import { IBlogState } from '../../app/interface/request/blogState';
import { IRequestBlogById } from '../../app/interface/request/requestBlogById';

export class BlogActions {
  static BlogSave = createAction<IBlogState>(types.BLOG_SAVE);
  static getAllBlogs = createAction(types.GET_ALL_BLOGS);
  static getAllUserBlogs = createAction<{userId: number}>(types.GET_USER_BLOGS);
  static getBlogById = createAction<IRequestBlogById>(types.GET_BLOG_BY_ID);
}
