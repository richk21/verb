import { RootState } from '../../app/store';

export const selectBlog = (state: RootState) => state.blog.blog;
export const selectbLOGErrorMessage = (state: RootState) => state.blog.errorMessage;
export const selectIsLoading = (state: RootState) => state.blog.isLoading;
