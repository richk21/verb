import { RootState } from '../../app/store';

export const selectUserErrorMessage = (state: RootState) => state.user.errorMessage;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user?.id || '';
export const selectViewableUserProfile = (state: RootState) => state.user.viewableUserProfile;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectUserSuccessMessage = (state: RootState) => state.user.successMessage;
