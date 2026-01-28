import { RootState } from '../../app/store';

export const selectBlog = (state: RootState) => state.blog.blog;
export const selectBlogErrorMessage = (state: RootState) => state.blog.errorMessage;
export const selectIsLoading = (state: RootState) => state.blog.isLoading;
export const selectAllBlogs = (state: RootState) => state.blog.allBlogs;
