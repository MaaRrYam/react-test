import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {FlashList} from '@shopify/flash-list';

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

  /**
   * @description This function handles the refresh event
   * @returns void
   */
  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(refetchFollowing());
  };

  /**
   * @description This function fetches the following list
   * @returns void
   */
  const fetchData = useCallback(() => {
    if (!isFollowingFetched) {
      dispatch(getFollowing());
    }
  }, [dispatch, isFollowingFetched]);

  /**
   * @description This effect filters the following list
   */
  useEffect(() => {
    if (!searchText.trim()) {
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

  /**
   * @description This effect fetches the following list
   */
  useEffect(() => {
    fetchData();

    if (isFollowingFetched) {
      setIsRefreshing(false);
    }
  }, [fetchData, isFollowingFetched]);

  /**
   * @description This condition checks if the following list is being fetched for the first time
   * @returns JSX.Element
   */
  if (isFollowingFirstRequest) {
    return <Loading />;
  }

  return (
    <>
      {filteredList.length ? (
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
