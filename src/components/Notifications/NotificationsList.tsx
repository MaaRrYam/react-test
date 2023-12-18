import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';

import {useAppSelector} from '@/hooks/useAppSelector';
import Empty from '../NoResults/Empty';
import NotificationItem from './NotificationItem';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {getNotifications} from '@/store/features/notificationsSlice';
import {FlashList} from '@shopify/flash-list';

const NotificationsList = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {notifications, isNotificationsFetched} = useAppSelector(
    state => state.notifications,
  );
  const dispatch = useAppDispatch();

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(getNotifications());
  };

  useEffect(() => {
    if (isNotificationsFetched) {
      setIsRefreshing(false);
    }
  }, [isRefreshing, isNotificationsFetched]);

  return (
    <>
      {notifications?.length ? (
        <FlashList
          data={notifications}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <NotificationItem item={item} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          estimatedItemSize={100}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default NotificationsList;
