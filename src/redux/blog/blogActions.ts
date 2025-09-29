import { createAction } from '@reduxjs/toolkit';
import { types } from '../../app/actionTypes';
import { IBlogState } from '../../app/interface/request/blogState';

export class BlogActions {
  static BlogSaveAsDraft = createAction<IBlogState>(types.BLOG_SAVE_AS_DRAFT);
  static BlogPublish = createAction<IBlogState>(types.BLOG_PUBLISH);
}
