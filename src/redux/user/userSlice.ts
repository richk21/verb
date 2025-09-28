import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../app/interface/user';

interface UserState {
  user: IUser | null;
  authToken: string | null;
  isLoading: boolean;
  errorMessage?: string;
}

const initialState: UserState = {
  user: null,
  authToken: null,
  isLoading: false,
  errorMessage: '',
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
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setUser, resetUser, setLoading, setErrorMessage, setAuthToken, resetAuthToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
