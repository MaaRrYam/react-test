import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {useAppSelector} from '@/hooks/useAppSelector';
import {NetworkItem, Loading} from '@/components';
import {Empty} from '@/components';
import {
  getConnections,
  refetchConnections,
} from '@/store/features/networkSlice';
import {useAppDispatch} from '@/hooks/useAppDispatch';

const Connections = () => {
  const {connections, isConnectionsFetched, isConnectionsFirstRequest} =
    useAppSelector(state => state.network);
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

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
        <FlashList
          data={connections}
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
          estimatedItemSize={50}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default Connections;
