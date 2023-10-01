import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {Loading} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {getFeed, setFeedFromCache} from '@/store/features/homeSlice';
import {COLORS} from '@/constants';
import FeedItem from './FeedItem';

const Feed = () => {
  const {feed, isFeedFetched, isFeedFirstRequest} = useAppSelector(
    state => state.home,
  );
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    dispatch(getFeed());
    setIsRefreshing(true);
  };

  const fetchData = useCallback(() => {
    if (!isFeedFetched) {
      dispatch(getFeed());
    }
  }, [dispatch, isFeedFetched]);

  useFocusEffect(() => {
    fetchData();
  });

  useEffect(() => {
    if (isFeedFetched) {
      setIsRefreshing(false);
    }

    dispatch(setFeedFromCache());
  }, [dispatch, isFeedFetched]);

  if (isFeedFirstRequest && !feed.length) {
    return <Loading />;
  }
  return (
    <>
      <FlatList
        data={feed}
        renderItem={({item}) => <FeedItem item={item} />}
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

export default Feed;
