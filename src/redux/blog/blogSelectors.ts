import { RootState } from '../../app/store';

export const selectCurrentBlog = (state: RootState) => state.blog.currentBlog;
export const selectBlog = (state: RootState) => state.blog.blog;
export const selectTotalBlogs = (state: RootState) => state.blog.allBlogstotalCount;
export const selectBlogErrorMessage = (state: RootState) => state.blog.errorMessage;
export const selectIsLoading = (state: RootState) => state.blog.isLoading;
export const selectAllBlogs = (state: RootState) => state.blog.allBlogs;
export const selectBlogSuccessMessage = (state: RootState) => state.blog.successMessage;
