import {NetworkResponse} from '@/interfaces';
import NetworkService from '@/services/network/Network';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  connections: [] as NetworkResponse[],
  followers: [] as NetworkResponse[],
  following: [] as NetworkResponse[],
  isConnectionsFetched: false,
  isFollowersFetched: false,
  isFollowingFetched: false,
};

export const getConnections = createAsyncThunk(
  'network/getConnections',
  async () => {
    const result = await NetworkService.getAllConnections();
    return result;
  },
);

export const getFollowers = createAsyncThunk(
  'network/getFollowers',
  async () => {
    const result = await NetworkService.getAllFollowers();
    return result;
  },
);

export const getFollowing = createAsyncThunk(
  'network/getFollowing',
  async () => {
    const result = await NetworkService.getAllFollowings();
    return result;
  },
);

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getConnections.fulfilled, (state, {payload}) => {
      state.connections = payload;
      state.isConnectionsFetched = true;
    });
    builder.addCase(getFollowers.fulfilled, (state, {payload}) => {
      state.followers = payload;
      state.isFollowersFetched = true;
    });
    builder.addCase(getFollowing.fulfilled, (state, {payload}) => {
      state.following = payload;
      state.isFollowingFetched = true;
    });
  },
});

export default networkSlice.reducer;
