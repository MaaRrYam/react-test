import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {useAppSelector} from '@/hooks/useAppSelector';
import {NetworkItem, Loading} from '@/components';
import {Empty} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {getFollowing, refetchFollowing} from '@/store/features/networkSlice';
import {LocalizedSearchProps} from '@/interfaces';

const Followings = ({searchText}: LocalizedSearchProps) => {
  const {following, isFollowingFetched, isFollowingFirstRequest} =
    useAppSelector(state => state.network);
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filteredList, setFilteredList] = useState(following);

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(refetchFollowing());
  };
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredList(following);
    } else {
      const filteredItems = following.filter(item => {
        if (typeof item.name === 'string') {
          return item.name.toLowerCase().includes(searchText.toLowerCase());
        }
      });
      setFilteredList(filteredItems);
    }
  }, [following, searchText]);
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
        <FlatList
          data={filteredList}
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
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default Followings;
