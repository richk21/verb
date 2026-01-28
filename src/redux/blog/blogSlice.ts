import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlog } from '../../app/interface/blog';

interface BlogState {
  blog: IBlog  | null;
  allBlogs: IBlog[] | null;
  allBlogstotalCount: number;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: BlogState = {
    blog: null,
    allBlogs: null,
    isLoading: false,
    errorMessage: null,
    allBlogstotalCount: 0,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlog: (state, action: PayloadAction<IBlog>) => {
      state.blog = action.payload;
    },
    setAllBlogs: (state, action: PayloadAction<IBlog[]>) => {
      state.allBlogs = action.payload;
    },
    resetBlog: (state) => {
      state.blog = initialState.blog;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setAllBlogstotalCount:(state, action: PayloadAction<number>) => {
      state.allBlogstotalCount = action.payload;
    }
  },
});

export const { setBlog, setAllBlogs, resetBlog, setLoading, setErrorMessage, setAllBlogstotalCount } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
