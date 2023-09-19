import React from 'react';
import {FlatList} from 'react-native';

import {useAppSelector} from '@/hooks/useAppSelector';
import {NetworkItem, Loading} from '@/components';
import {Empty} from '@/components';

const Connections = () => {
  const {connections, isConnectionsFetched} = useAppSelector(
    state => state.network,
  );

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
