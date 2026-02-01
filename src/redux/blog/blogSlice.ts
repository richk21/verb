import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlog } from '../../app/interface/blog';

interface BlogState {
  currentBlog: IBlog  | null; //FOR PREVIEW AND EDIT
  blog: IBlog | null; //FOR VIEWING
  allBlogs: IBlog[] | null;
  allBlogstotalCount: number;
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: BlogState = {
    currentBlog: null,
    blog: null,
    allBlogs: null,
    isLoading: false,
    errorMessage: null,
    successMessage: null,
    allBlogstotalCount: 0,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setCurrentBlog: (state, action: PayloadAction<IBlog>) => {
      state.currentBlog = action.payload;
    },
    setBlog: (state, action: PayloadAction<IBlog>) => {
      state.blog = action.payload;
    },
    setAllBlogs: (state, action: PayloadAction<{ blogs: IBlog[]; page: number }>) => {
      const { blogs, page } = action.payload;

      if (page === 1) {
        state.allBlogs = blogs;
      } else {
        state.allBlogs = [...(state.allBlogs || []), ...blogs];
      }
    },
    resetCurrentBlog: (state) => {
      state.currentBlog = initialState.currentBlog;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setAllBlogstotalCount:(state, action: PayloadAction<number>) => {
      state.allBlogstotalCount = action.payload;
    },
    setBlogSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload;
    }
  },
});

export const { setCurrentBlog, setBlog, setAllBlogs, resetCurrentBlog, setLoading, setErrorMessage, setAllBlogstotalCount, setBlogSuccessMessage } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
