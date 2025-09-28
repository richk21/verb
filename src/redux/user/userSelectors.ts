import { RootState } from '../../app/store';

export const selectUserErrorMessage = (state: RootState) => state.user.errorMessage;
export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
