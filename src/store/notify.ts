import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { query } from '../graphql/client';
import { NOTIFICATIONS_QUERY } from 'graphql/queries';
import { NotifyState, Notify } from 'types';
import { RootState } from 'store';

export const fetchNotifications = createAsyncThunk<Notify[], void>(
  'notify/fetchNotifications',
  async () => {
    try {
      const notify = await query<void, Notify[]>(
        'getNotifications',
        NOTIFICATIONS_QUERY,
        undefined
      );

      return notify;
    } catch (error) {
      console.log(error);

      return undefined;
    }
  }
);

const initialState: NotifyState = {
  notifications: [],
  loading: false,
};

const notifySlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, { payload }) => {
      state.notifications = payload;
      state.loading = false;
    });
    builder.addCase(fetchNotifications.rejected, (state, { payload }) => {
      state = initialState;
    });
  },
});

export const notifyStateSelector = (state: RootState) => state.notify;

export const notifySelector = () =>
  createSelector(notifyStateSelector, (state) => state.notifications);

export const notifyLoadingSelector = () =>
  createSelector(notifyStateSelector, (state) => state.loading);

export default notifySlice.reducer;
