import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {FeedItem, ReactionPayload} from '@/interfaces';
import HomeService from '@/services/home';
import {getUID} from '@/utils/functions';
import Cache from '@/cache';

let localFeed: FeedItem[] | null = null;
(async () => {
  localFeed = await Cache.get('feed');
})();

const initialState = {
  feed: [] as FeedItem[],
  isFeedFetched: false,
  isFeedFirstRequest: true,
};

export const getFeed = createAsyncThunk('home/getFeed', async () => {
  const result = await HomeService.getFeed();
  const mergedFeed: FeedItem[] = localFeed ? [...localFeed] : [];

  if (localFeed) {
    result.forEach((post: FeedItem) => {
      const foundPost = localFeed!.find(
        (item: FeedItem) => item.id === post.id,
      );

      if (!foundPost) {
        mergedFeed.push(post);
      }
    });
  } else {
    mergedFeed.push(...result);
  }

  return mergedFeed;
});

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setFeedFromCache(state) {
      if (localFeed) {
        state.feed = localFeed;
      }
    },
    setFeedFetchedToFalse(state) {
      state.isFeedFetched = false;
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
  removeDisLike,
  removeLike,
  addDislikeAndRemoveLike,
  addLikeAndRemoveDislike,
  setFeedFromCache,
  setFeedFetchedToFalse,
} = homeSlice.actions;

export default homeSlice.reducer;
