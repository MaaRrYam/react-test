import {NetworkResponse} from '@/interfaces';
import NetworkService from '@/services/network/Network';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  connections: [] as NetworkResponse[],
  followers: [] as NetworkResponse[],
  following: [] as NetworkResponse[],
  recommendations: [] as NetworkResponse[],
  isRecommendationsFetched: false,
  isRecommendationsFirstRequest: true,
  isConnectionsFetched: false,
  isConnectionsFirstRequest: true,
  isFollowersFetched: false,
  isFollowersFirstRequest: true,
  isFollowingFetched: false,
  isFollowingFirstRequest: true,
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

export const getRecommendedConnections = createAsyncThunk(
  'network/getRecommendedConnections',
  async () => {
    const result = await NetworkService.getRecommendedConnections();
    return result;
  },
);

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    removeConnection(state, {payload}: {payload: string}) {
      state.connections = state.connections.filter(
        connection => connection.id !== payload,
      );
    },
    connectWithSomeone(state, {payload}: {payload: string}) {
      state.recommendations = state.recommendations.filter(
        recommendation => recommendation.id !== payload,
      );
    },
    unfollow(state, {payload}: {payload: string}) {
      state.following = state.following.filter(
        following => following.id !== payload,
      );
    },
    refetchRecommendations(state) {
      state.isRecommendationsFetched = false;
    },
    refetchConnections(state) {
      state.isConnectionsFetched = false;
    },
    refetchFollowing(state) {
      state.isFollowingFetched = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getConnections.fulfilled, (state, {payload}) => {
      state.connections = payload;
      state.isConnectionsFetched = true;
      state.isConnectionsFirstRequest = false;
    });
    builder.addCase(getFollowers.fulfilled, (state, {payload}) => {
      state.followers = payload;
      state.isFollowersFetched = true;
      state.isFollowersFirstRequest = false;
    });
    builder.addCase(getFollowing.fulfilled, (state, {payload}) => {
      state.following = payload;
      state.isFollowingFetched = true;
      state.isFollowingFirstRequest = false;
    });
    builder.addCase(getRecommendedConnections.fulfilled, (state, {payload}) => {
      state.recommendations = payload;
      state.isRecommendationsFetched = true;
      state.isRecommendationsFirstRequest = false;
    });
  },
});

export const {
  removeConnection,
  connectWithSomeone,
  unfollow,
  refetchRecommendations,
  refetchConnections,
  refetchFollowing,
} = networkSlice.actions;

export default networkSlice.reducer;
