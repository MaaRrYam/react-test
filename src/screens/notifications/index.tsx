import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, View, RefreshControl} from 'react-native';

import {homeStyles} from '@/styles/home';
import {Header, NotificationItem, Loading} from '@/components';
import {NotificationsScreenProps} from '@/types';
import {FlatList} from 'react-native';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {getNotifications} from '@/store/features/notificationsSlice';
import {useFocusEffect} from '@react-navigation/native';

const Notifications: React.FC<NotificationsScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {notifications, isNotificationsFetched, isNotificationsFirstRequest} =
    useAppSelector(state => state.notifications);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(getNotifications());
  };

  const fetchData = useCallback(() => {
    if (!isNotificationsFetched) {
      dispatch(getNotifications());
    }
  }, [dispatch, isNotificationsFetched]);

  useEffect(() => {
    if (isNotificationsFetched) {
      setIsRefreshing(false);
    }
  }, [isRefreshing, isNotificationsFetched]);

  useFocusEffect(() => {
    fetchData();
  });

  return (
    <View style={homeStyles.outerContainer}>
      <SafeAreaView style={homeStyles.container}>
        <Header navigation={navigation} />

        {isNotificationsFirstRequest ? (
          <Loading />
        ) : (
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
        )}
      </SafeAreaView>
    </View>
  );
};

export default Notifications;
