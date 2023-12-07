import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {useAppSelector} from '@/hooks/useAppSelector';
import {NetworkItem, Loading} from '@/components';
import {Empty} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {getFollowing, refetchFollowing} from '@/store/features/networkSlice';

const Followings = () => {
  const {following, isFollowingFetched, isFollowingFirstRequest} =
    useAppSelector(state => state.network);
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(refetchFollowing());
  };

  const fetchData = useCallback(() => {
    if (!isFollowingFetched) {
      dispatch(getFollowing());
    }
  }, [dispatch, isFollowingFetched]);

  useEffect(() => {
    fetchData();

    if (isFollowingFetched) {
      setIsRefreshing(false);
    }
  }, [fetchData, isFollowingFetched]);

  if (isFollowingFirstRequest) {
    return <Loading />;
  }

  return (
    <>
      {following.length ? (
        <FlashList
          data={following}
          keyExtractor={item => item.id?.toString()}
          renderItem={({item}) => (
            <NetworkItem item={item} isFollowing={true} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          estimatedItemSize={30}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default Followings;
