import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {useAppSelector} from '@/hooks/useAppSelector';
import {NetworkItem, Loading} from '@/components';
import {Empty} from '@/components';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {refetchRecommendations} from '@/store/features/networkSlice';
import {LocalizedSearchProps} from '@/interfaces';

const Explore = ({searchText}: LocalizedSearchProps) => {
  const {
    recommendations,
    isRecommendationsFetched,
    isRecommendationsFirstRequest,
  } = useAppSelector(state => state.network);
  const dispatch = useAppDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filteredList, setFilteredList] = useState(recommendations);

  const handleRefresh = () => {
    dispatch(refetchRecommendations());
    setIsRefreshing(true);
  };

  useEffect(() => {
    if (isRecommendationsFetched) {
      setIsRefreshing(false);
    }
  }, [isRecommendationsFetched]);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredList(recommendations);
    } else {
      const filteredItems = recommendations.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredList(filteredItems);
    }
  }, [recommendations, searchText]);

  if (isRecommendationsFirstRequest) {
    return <Loading />;
  }

  return (
    <>
      {filteredList.length ? (
        <FlashList
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
          estimatedItemSize={10}
        />
      ) : (
        <Empty text="Connections" />
      )}
    </>
  );
};

export default Explore;
