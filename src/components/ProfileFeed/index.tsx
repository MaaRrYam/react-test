import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {Loading} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {
  getFeed,
  setFeedFetchedToFalse,
  setFeedFromCache,
} from '@/store/features/profileSlice';
import FeedItem from '@/components/Feed/FeedItem';
import {ProfileFeedInterface} from '@/interfaces';
import HomeService from '@/services/home';

const ProfileFeed = ({setComments}: ProfileFeedInterface) => {
  const {profileFeed, isFeedFetched, isFeedFirstRequest} = useAppSelector(
    state => state.profile,
  );
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

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

  if (isFeedFirstRequest && !profileFeed.length) {
    return <Loading />;
  }
  return (
    <>
      <FlatList
        data={profileFeed}
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
    </>
  );
};

export default ProfileFeed;
