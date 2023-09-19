import React, {useCallback, useEffect} from 'react';
import {FlatList} from 'react-native';

import {useAppSelector} from '@/hooks/useAppSelector';
import {NetworkItem, Loading} from '@/components';
import {Empty} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {getFollowing} from '@/store/features/networkSlice';

const Followings = () => {
  const {following, isFollowingFetched} = useAppSelector(
    state => state.network,
  );
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    if (!isFollowingFetched) {
      dispatch(getFollowing());
    }
  }, [dispatch, isFollowingFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!isFollowingFetched) {
    return <Loading />;
  }

  return (
    <>
      {following.length ? (
        <FlatList
          data={following}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <NetworkItem item={item} />}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default Followings;
