import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {useAppSelector} from '@/hooks/useAppSelector';
import {NetworkItem, Loading} from '@/components';
import {Empty} from '@/components';
import {
  getConnections,
  refetchConnections,
} from '@/store/features/networkSlice';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {LocalizedSearchProps} from '@/interfaces';

const Connections = ({searchText}: LocalizedSearchProps) => {
  const {connections, isConnectionsFetched, isConnectionsFirstRequest} =
    useAppSelector(state => state.network);
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filteredList, setFilteredList] = useState(connections);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredList(connections);
    } else {
      const filteredItems = connections.filter(item => {
        // Check if 'name' is a string before using toLowerCase
        if (typeof item.name === 'string') {
          return item.name.toLowerCase().includes(searchText.toLowerCase());
        }
        return false; // or handle this scenario accordingly based on your data
      });
      setFilteredList(filteredItems);
    }
  }, [connections, searchText]);
  const fetchData = useCallback(() => {
    if (!isConnectionsFetched) {
      dispatch(getConnections());
    }
  }, [dispatch, isConnectionsFetched]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(refetchConnections());
  };

  useEffect(() => {
    fetchData();

    if (isConnectionsFetched) {
      setIsRefreshing(false);
    }
  }, [fetchData, isConnectionsFetched]);

  if (isConnectionsFirstRequest) {
    return <Loading />;
  }

  return (
    <>
      {connections.length ? (
        <FlatList
          data={filteredList}
          keyExtractor={item => item.id?.toString()}
          renderItem={({item}) => (
            <NetworkItem item={item} isConnection={true} />
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

export default Connections;
