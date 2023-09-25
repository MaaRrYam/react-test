import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {FeedItem} from '@/interfaces';
import HomeService from '@/services/home';

const initialState = {
  feed: [] as FeedItem[],
  isFeedFetched: false,
  isFeedFirstRequest: true,
};

export const getFeed = createAsyncThunk('home/getFeed', async () => {
  const result = await HomeService.getFeed();
  return result;
});

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getFeed.fulfilled, (state, {payload}) => {
      state.feed = payload;
      state.isFeedFetched = true;
      state.isFeedFirstRequest = false;
    });
  },
});

export default homeSlice.reducer;
