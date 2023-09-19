import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {useAppSelector} from '@/hooks/useAppSelector';
import {NetworkItem, Loading} from '@/components';
import {Empty} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {refetchRecommendations} from '@/store/features/networkSlice';

const Explore = () => {
  const {
    recommendations,
    isRecommendationsFetched,
    isRecommendationsFirstRequest,
  } = useAppSelector(state => state.network);
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    dispatch(refetchRecommendations());
    setIsRefreshing(true);
  };

  useEffect(() => {
    if (isRecommendationsFetched) {
      setIsRefreshing(false);
    }
  }, [isRecommendationsFetched]);

  if (isRecommendationsFirstRequest) {
    return <Loading />;
  }

  return (
    <>
      {recommendations.length ? (
        <FlatList
          data={recommendations}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <NetworkItem item={item} isExploring={true} />
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

export default Explore;
