import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {Loading, BottomSheet} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {
  getFeed,
  setFeedFetchedToFalse,
  setFeedFromCache,
} from '@/store/features/homeSlice';
import FeedItem from './FeedItem';
import PostComments from './PostComments';
import {FeedComment} from '@/interfaces';
import HomeService from '@/services/home';

const Feed = () => {
  const {feed, isFeedFetched, isFeedFirstRequest} = useAppSelector(
    state => state.home,
  );
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [comments, setComments] = useState({
    loading: false,
    comments: [] as FeedComment[],
    showComments: false,
  });

  const handleRefresh = () => {
    dispatch(getFeed());
    dispatch(setFeedFetchedToFalse());
    setIsRefreshing(true);
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
      setIsRefreshing(false);
    }
  }, [isFeedFetched]);

  useEffect(() => {
    dispatch(setFeedFromCache());
  }, [dispatch]);

  const fetchPostComments = async (postId: string) => {
    setComments(prev => ({...prev, loading: true, showComments: true}));
    const response = await HomeService.fetchPostComments(postId);
    setComments(prev => ({...prev, loading: false, comments: response}));
  };

  if (isFeedFirstRequest && !feed.length) {
    return <Loading />;
  }
  return (
    <>
      <FlatList
        data={feed}
        renderItem={({item}) => (
          <FeedItem item={item} fetchPostComments={fetchPostComments} />
        )}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
      {/* {!isFeedFetched && feed.length && (
        <ActivityIndicator color={COLORS.primary} size="large" />
      )} */}

      {comments.showComments && (
        <BottomSheet
          isVisible={comments.showComments}
          snapPoints={['20%', '100%']}
          onClose={() => setComments(prev => ({...prev, showComments: false}))}>
          <PostComments
            showComments={comments.showComments}
            comments={comments.comments}
            loading={comments.loading}
          />
        </BottomSheet>
      )}
    </>
  );
};

export default Feed;