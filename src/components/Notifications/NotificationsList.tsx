import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {useAppSelector} from '@/hooks/useAppSelector';
import Empty from '../NoResults/Empty';
import NotificationItem from './NotificationItem';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {getNotifications} from '@/store/features/notificationsSlice';

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
      {notifications.length ? (
        <FlatList
          data={notifications}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <NotificationItem item={item} />}
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

export default NotificationsList;
