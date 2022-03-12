import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { query, mutate } from '../graphql/client';
import { BLOGS_QUERY } from '../graphql/queries';
import { REMOVE_BLOG_MUTATION, BLOG_MUTATION } from '../graphql/mutations';
import { Blog, BlogState, NewBlog } from 'types';
import { RootState } from './index';

export const fetchBlogs = createAsyncThunk<
  Blog[],
  undefined,
  { rejectValue: string }
>('blogs/fetchBlogs', async (payload, { rejectWithValue }) => {
  try {
    const blogs = await query<any, Blog[]>('getAllBlogs', BLOGS_QUERY, {});

    return blogs;
  } catch (error) {
    rejectWithValue(error.message);
  }
});

export const removeBlog = createAsyncThunk<
  Blog[],
  { blogId: string },
  { rejectValue: string }
>('blogs/deleteBlog', async ({ blogId }, { rejectWithValue }) => {
  try {
    await mutate<{ blog: string }, undefined>(
      'RemoveBlog',
      REMOVE_BLOG_MUTATION,
      {
        blog: blogId,
      }
    );

    const newBlogs = await query<any, Blog[]>('getAllBlogs', BLOGS_QUERY, {});

    return newBlogs;
  } catch (error) {
    rejectWithValue(error.message);
  }
});

export const createBlog = createAsyncThunk<
  Blog[],
  { blog: NewBlog },
  { rejectValue: string }
>('blogs/createBlog', async ({ blog }, { rejectWithValue }) => {
  try {
    await mutate<{ blog: NewBlog }, undefined>('AddBlog', BLOG_MUTATION, {
      blog,
    });

    const newBlogs = await query<any, Blog[]>('getAllBlogs', BLOGS_QUERY, {});

    return newBlogs;
  } catch (error) {
    rejectWithValue(error.message);
  }
});

export const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: undefined,
  fetched: false,
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, { payload }) => {
      state.blogs = payload;
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(fetchBlogs.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(removeBlog.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(removeBlog.fulfilled, (state, { payload }) => {
      state.blogs = payload;
      state.loading = false;
    });
    builder.addCase(removeBlog.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(createBlog.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(createBlog.fulfilled, (state, { payload }) => {
      state.blogs = payload;
      state.loading = false;
    });
    builder.addCase(createBlog.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
  },
});

export const blogsStateSelector = (state: RootState) => state.blogs;

export const blogsSelector = () =>
  createSelector(blogsStateSelector, (state) => state.blogs);

export const blogsLoadingSelector = () =>
  createSelector(blogsStateSelector, (state) => state.loading);

export const blogsFetchedSelector = () =>
  createSelector(blogsStateSelector, (state) => state.fetched);

export default blogsSlice.reducer;
