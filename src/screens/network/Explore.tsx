import React from 'react';
import {FlatList} from 'react-native';

import {useAppSelector} from '@/hooks/useAppSelector';
import {NetworkItem, Loading} from '@/components';
import {Empty} from '@/components';

const Explore = () => {
  const {recommendations, isRecommendationsFetched} = useAppSelector(
    state => state.network,
  );

  if (!isRecommendationsFetched) {
    return <Loading />;
  }

  return (
    <>
      {recommendations.length ? (
        <FlatList
          data={recommendations}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <NetworkItem item={item} />}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default Explore;
