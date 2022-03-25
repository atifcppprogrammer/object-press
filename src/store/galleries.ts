import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { query } from '../graphql/client';
import { GALLERIES_QUERY } from '../graphql/queries';
import { GalleryList, GalleryState } from 'types';
import { RootState } from './index';

/**
 * TODO: add logic to backend
 */
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
