import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {FeedItem, ReactionPayload} from '@/interfaces';
import HomeService from '@/services/home';
import {getUID} from '@/utils/functions';
import ProfileService from '@/services/profile';

const initialState = {
  feed: [] as FeedItem[],
  isFeedFetched: false,
  isFeedFirstRequest: true,
  isRefreshing: false,
  profileFeed: [] as FeedItem[],
  isProfileFeedFetched: false,
};

export const getFeed = createAsyncThunk('home/getFeed', async () => {
  const result = await HomeService.getFeed();
  return result;
});

export const getProfileFeed = createAsyncThunk(
  'home/getProfileFeed',
  async (uid: string) => {
    const result = await ProfileService.getFeed(uid);
    return result;
  },
);

export const refreshFeed = createAsyncThunk('home/refreshFeed', async () => {
  const result = await HomeService.getFeed();
  return result;
});

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    removeReportedPostFromFeed(state, {payload}: {payload: string}) {
      state.feed = state.feed.filter(post => post.id !== payload);
    },
    setFeedFetchedToFalse(state) {
      state.isFeedFetched = false;
    },
    setIsRefreshingToFalse(state) {
      state.isRefreshing = false;
    },
    addLike(state, {payload}: {payload: ReactionPayload}) {
      state.feed = state.feed.map(post => {
        if (post.id === payload.id) {
          if (post.postLikes) {
            return {
              ...post,
              postLikes: [...post.postLikes, payload.reaction],
            };
          }
        }
        return post;
      });
    },
    addDislike(state, {payload}: {payload: ReactionPayload}) {
      state.feed = state.feed.map(post => {
        if (post.id === payload.id) {
          if (post.postDislikes) {
            return {
              ...post,
              postDislikes: [...post.postDislikes, payload.reaction],
            };
          }
        }

        return post;
      });
    },
    removeLike(state, {payload}: {payload: ReactionPayload}) {
      state.feed = state.feed.map(post => {
        if (post.id === payload.id) {
          if (post.postLikes) {
            return {
              ...post,
              postLikes: post.postLikes.filter(
                like => like.likedBy !== payload.reaction.likedBy,
              ),
            };
          }
        }

        return post;
      });
    },
    removeDisLike(state, {payload}: {payload: ReactionPayload}) {
      state.feed = state.feed.map(post => {
        if (post.id === payload.id) {
          if (post.postDislikes) {
            return {
              ...post,
              postDislikes: post.postDislikes.filter(
                like => like.likedBy !== payload.reaction.likedBy,
              ),
            };
          }
        }

        return post;
      });
    },
    addDislikeAndRemoveLike(state, {payload}: {payload: ReactionPayload}) {
      let UID = '';
      (async () => {
        UID = (await getUID()) as string;
      })();

      state.feed = state.feed.map(post => {
        if (post.id === payload.id) {
          if (post.postDislikes && post.postLikes) {
            return {
              ...post,
              postDislikes: [...post.postDislikes, payload.reaction],
              postLikes: post.postLikes.filter(like => like.likedBy !== UID),
            };
          }
        }

        return post;
      });
    },
    addLikeAndRemoveDislike(state, {payload}: {payload: ReactionPayload}) {
      let UID = '';
      (async () => {
        UID = (await getUID()) as string;
      })();

      state.feed = state.feed.map(post => {
        if (post.id === payload.id) {
          if (post.postDislikes && post.postLikes) {
            return {
              ...post,
              postDislikes: post.postDislikes.filter(
                like => like.likedBy !== UID,
              ),
              postLikes: [...post.postLikes, payload.reaction],
            };
          }
        }

        return post;
      });
    },
    addPostToProfileFeed(state, {payload}: {payload: FeedItem}) {
      state.profileFeed = [payload, ...state.profileFeed];
    },
  },
  extraReducers: builder => {
    builder.addCase(getFeed.fulfilled, (state, {payload}) => {
      state.feed = payload;
      state.isFeedFetched = true;
      state.isFeedFirstRequest = false;
    });
    builder.addCase(refreshFeed.pending, state => {
      state.isFeedFetched = false;
      state.isRefreshing = true;
    });
    builder.addCase(refreshFeed.fulfilled, (state, {payload}) => {
      state.feed = payload;
      state.isFeedFetched = true;
    });
    builder.addCase(getProfileFeed.fulfilled, (state, {payload}) => {
      state.profileFeed = payload;
      state.isProfileFeedFetched = true;
    });
    builder.addCase(getProfileFeed.pending, state => {
      state.isProfileFeedFetched = false;
    });
  },
});

export const {
  addDislike,
  addLike,
  removeDisLike,
  removeLike,
  addDislikeAndRemoveLike,
  addLikeAndRemoveDislike,
  setFeedFetchedToFalse,
  removeReportedPostFromFeed,
  setIsRefreshingToFalse,
  addPostToProfileFeed,
} = homeSlice.actions;

export default homeSlice.reducer;
