import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { query } from '../graphql/client';
import { BLOGS_QUERY, GALLERIES_QUERY } from '../graphql/queries';
import { Blog, Gallery, GalleryState } from 'types';
import { RootState } from './index';

/**
 * TODO: add logic to backend
 */
export const fetchGalleries = createAsyncThunk<
  Gallery[],
  undefined,
  { rejectValue: string }
>('galleries/fetchGalleries', async (payload, { rejectWithValue }) => {
  try {
    const blogs = await query<any, Blog[]>('getAllBlogs', BLOGS_QUERY, {});
    const galleries = await query<any, Gallery[]>(
      'getAllGalleries',
      GALLERIES_QUERY,
      {}
    );

    const blogNames = blogs.map((_) => {
      return {
        name: _.title,
        id: _.id,
        description: _.description,
        blog: true,
      };
    });
    const galleryNames = galleries.map((_) => {
      return {
        name: _.name,
        id: _.id,
        description: _.description,
        blog: false,
      };
    });

    let galleryList: Gallery[] = [...blogNames, ...galleryNames];

    galleryList.sort((a, b) => a.name.localeCompare(b.name));

    return galleryList;
  } catch (error) {
    rejectWithValue(error.message);
  }
});

export const initialState: GalleryState = {
  galleries: [],
  loading: false,
  error: undefined,
  fetched: false,
};

const galleriesSlice = createSlice({
  name: 'galleries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGalleries.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchGalleries.fulfilled, (state, { payload }) => {
      state.galleries = payload;
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(fetchGalleries.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
  },
});

export const galleriesStateSelector = (state: RootState) => state.galleries;

export const galleriesSelector = () =>
  createSelector(galleriesStateSelector, (state) => state.galleries);

export const galleriesLoadingSelector = () =>
  createSelector(galleriesStateSelector, (state) => state.loading);

export const galleriesFetchedSelector = () =>
  createSelector(galleriesStateSelector, (state) => state.fetched);

export default galleriesSlice.reducer;
