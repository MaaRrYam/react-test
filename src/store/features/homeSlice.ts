import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {FeedItem, ReactionPayload} from '@/interfaces';
import HomeService from '@/services/home';
import {getUID} from '@/utils/functions';

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
  reducers: {
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
  },
  extraReducers: builder => {
    builder.addCase(getFeed.fulfilled, (state, {payload}) => {
      state.feed = payload;
      state.isFeedFetched = true;
      state.isFeedFirstRequest = false;
    });
  },
});

export const {
  addDislike,
  addLike,
  addDislikeAndRemoveLike,
  addLikeAndRemoveDislike,
} = homeSlice.actions;

export default homeSlice.reducer;
