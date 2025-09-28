import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlog } from '../../app/interface/blog';

interface BlogState {
  blog: IBlog  | null;
  isLoading: boolean;
  errorMessage: string;
}

const initialState: BlogState = {
    blog: null,
    isLoading: false,
    errorMessage: '',
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlog: (state, action: PayloadAction<IBlog>) => {
      state.blog = action.payload;
    },
    resetBlog: (state) => {
      state.blog = initialState.blog;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setBlog, resetBlog, setLoading, setErrorMessage } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
