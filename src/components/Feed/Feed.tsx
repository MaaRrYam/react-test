import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {BottomSheet, PostsSkeleton} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {
  getFeed,
  refreshFeed,
  setFeedFetchedToFalse,
  setFeedFromCache,
  setIsRefreshingToFalse,
} from '@/store/features/homeSlice';
import FeedItem from './FeedItem';
import PostComments from './PostComments';
import HomeService from '@/services/home';
import {FeedCommentsResponse} from '@/interfaces';

const Feed = () => {
  const {feed, isFeedFetched, isRefreshing} = useAppSelector(
    state => state.home,
  );
  const dispatch = useAppDispatch();

  const [comments, setComments] = useState({
    postId: '',
    loading: false,
    comments: [] as FeedCommentsResponse[],
    showComments: false,
  });

  const handleRefresh = () => {
    dispatch(refreshFeed());
    dispatch(setFeedFetchedToFalse());
  };

  const fetchData = useCallback(() => {
    if (!isFeedFetched) {
      dispatch(getFeed());
    }
  }, [dispatch, isFeedFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (isFeedFetched) {
      dispatch(setIsRefreshingToFalse());
    }
  }, [dispatch, isFeedFetched]);

  useEffect(() => {
    dispatch(setFeedFromCache());
  }, [dispatch]);

  const fetchPostComments = async (postId: string) => {
    setComments(prev => ({...prev, loading: true, showComments: true, postId}));
    const response = await HomeService.fetchPostComments(postId);
    setComments(prev => ({...prev, loading: false, comments: response}));
  };

  return (
    <>
      {isFeedFetched ? (
        <FlatList
          data={feed}
          renderItem={({item}) => (
            <FeedItem item={item} fetchPostComments={fetchPostComments} />
          )}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      ) : (
        <PostsSkeleton />
      )}

      {comments.showComments && (
        <BottomSheet
          isVisible={comments.showComments}
          snapPoints={['20%', '100%']}
          onClose={() => setComments(prev => ({...prev, showComments: false}))}>
          <PostComments
            showComments={comments.showComments}
            comments={comments.comments}
            loading={comments.loading}
            setComments={setComments}
            postId={comments.postId}
          />
        </BottomSheet>
      )}
    </>
  );
};

export default Feed;
