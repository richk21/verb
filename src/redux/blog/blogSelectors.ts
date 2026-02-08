import { RootState } from '../../app/store';

export const selectCurrentBlog = (state: RootState) => state.blog.currentBlog;
export const selectBlog = (state: RootState) => state.blog.blog;
export const selectTotalBlogs = (state: RootState) => state.blog.allBlogstotalCount;
export const selectBlogErrorMessage = (state: RootState) => state.blog.errorMessage;
export const selectIsLoading = (state: RootState) => state.blog.isLoading;
export const selectAllBlogs = (state: RootState) => state.blog.allBlogs;
export const selectAllUserBlogsTotalCount = (state: RootState) => state.blog.allUserBlogsTotalCount;
export const selectAllUserBlogs = (state: RootState) => state.blog.allUserBlogs;
export const selectBlogSuccessMessage = (state: RootState) => state.blog.successMessage;
export const selectUnsplashCoverImages = (state: RootState) => state.blog.unsplashImages;
export const selectIsUnsplashImagesLoading = (state: RootState) =>
  state.blog.isUnsplashImagesLoadingState;
export const selectBlogUnsplashErrorMessage = (state: RootState) => state.blog.unsplashErrorMessage;
export const selectBlogUnsplashSuccessMessage = (state: RootState) =>
  state.blog.unsplashSuccessMessage;
