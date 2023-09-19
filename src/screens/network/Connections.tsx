import React, {useCallback, useEffect} from 'react';
import {FlatList} from 'react-native';

import {useAppSelector} from '@/hooks/useAppSelector';
import {NetworkItem, Loading} from '@/components';
import {Empty} from '@/components';
import {getConnections} from '@/store/features/networkSlice';
import {useAppDispatch} from '@/hooks/useAppDispatch';

const Connections = () => {
  const {connections, isConnectionsFetched} = useAppSelector(
    state => state.network,
  );
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    if (!isConnectionsFetched) {
      dispatch(getConnections());
    }
  }, [dispatch, isConnectionsFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!isConnectionsFetched) {
    return <Loading />;
  }

  return (
    <>
      {connections.length ? (
        <FlatList
          data={connections}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <NetworkItem item={item} />}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default Connections;
