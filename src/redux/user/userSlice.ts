import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../app/interface/user';

interface UserState {
  user: IUser | null;
  authToken: string | null;
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  viewableUserProfile: IUser | null;
}

const initialState: UserState = {
  user: null,
  authToken: null,
  isLoading: false,
  errorMessage: null,
  successMessage: null,
  viewableUserProfile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    resetAuthToken: (state) => {
      state.authToken = initialState.authToken;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload;
    },
    setViewableUserProfile: (state, action: PayloadAction<IUser | null>) => {
      state.viewableUserProfile = action.payload;
    },
  },
});

export const { setUser, resetUser, setLoading, setErrorMessage, setAuthToken, resetAuthToken, setSuccessMessage, setViewableUserProfile } = userSlice.actions;
export const userReducer = userSlice.reducer;
