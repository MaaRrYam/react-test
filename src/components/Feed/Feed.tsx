import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {Loading} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {getFeed} from '@/store/features/homeSlice';
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

  useEffect(() => {
    fetchData();
    if (isFeedFetched) {
      setIsRefreshing(false);
    }
  }, [fetchData, isFeedFetched]);

  if (isFeedFirstRequest) {
    return <Loading />;
  }

  return (
    <FlatList
      data={feed}
      renderItem={({item}) => <FeedItem item={item} />}
      keyExtractor={item => item._id}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

export default Feed;
