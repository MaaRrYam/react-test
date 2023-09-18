import React from 'react';
import {FlatList} from 'react-native';

import {useAppSelector} from '@/hooks/useAppSelector';
import {NetworkItem, Loading} from '@/components';
import {Empty} from '@/components';

const Followings = () => {
  const {following, isFollowingFetched} = useAppSelector(
    state => state.network,
  );

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
