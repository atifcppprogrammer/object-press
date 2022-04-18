import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { query, mutate } from '../graphql/client';
import { GALLERIES_QUERY, GALLERY_QUERY } from '../graphql/queries';
import { GalleryList, GalleryState, NewGallery } from 'types';
import { RootState } from './index';
import { GALLERY_MUTATION, REMOVE_GALLERY_MUTATION } from 'graphql/mutations';

export const fetchGalleries = createAsyncThunk<
  GalleryList[],
  undefined,
  { rejectValue: string }
>('galleries/fetchGalleries', async (payload, { rejectWithValue }) => {
  try {
    const galleries = await query<any, GalleryList[]>(
      'getGalleryList',
      GALLERIES_QUERY,
      {}
    );

    return galleries;
  } catch (error) {
    rejectWithValue(error.message);
  }
});

export const fetchGallery = createAsyncThunk<
  GalleryList,
  string,
  { rejectValue: string }
>('galleries/fetchGallery', async (gallery, { rejectWithValue }) => {
  try {
    const galleryData = await query<{ gallery: string }, GalleryList>(
      'getGallery',
      GALLERY_QUERY,
      {
        gallery,
      }
    );

    return galleryData;
  } catch (error) {
    rejectWithValue(error.message);
  }
});

export const createGallery = createAsyncThunk<
  void,
  { gallery: NewGallery },
  { rejectValue: string }
>('galleries/createGallery', async ({ gallery }, { rejectWithValue }) => {
  try {
    await mutate<{ gallery: NewGallery }, undefined>(
      'addGallery',
      GALLERY_MUTATION,
      {
        gallery,
      }
    );
  } catch (error) {
    rejectWithValue(error.message);
  }
});

export const removeGallery = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>('galleries/removeGallery', async (gallery, { rejectWithValue }) => {
  try {
    await mutate<{ gallery: string }, undefined>(
      'removeGallery',
      REMOVE_GALLERY_MUTATION,
      {
        gallery,
      }
    );
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
    builder.addCase(fetchGallery.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchGallery.fulfilled, (state, { payload }) => {
      state.galleries = payload;
      state.loading = false;
      state.fetched = true;
    });
    builder.addCase(fetchGallery.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(createGallery.pending, (state, { payload }) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(createGallery.fulfilled, (state, { payload }) => {
      state.error = undefined;
      state.loading = false;
    });
    builder.addCase(createGallery.rejected, (state, { payload }) => {
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
