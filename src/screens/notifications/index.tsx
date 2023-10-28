import React, {useCallback} from 'react';
import {SafeAreaView, View} from 'react-native';

import {homeStyles} from '@/styles/home';
import {Header, Loading, NotificationsList} from '@/components';
import {NotificationsScreenProps} from '@/types';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {getNotifications} from '@/store/features/notificationsSlice';
import {useFocusEffect} from '@react-navigation/native';

const Notifications: React.FC<NotificationsScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {isNotificationsFetched, isNotificationsFirstRequest} = useAppSelector(
    state => state.notifications,
  );

  const fetchData = useCallback(() => {
    if (!isNotificationsFetched) {
      dispatch(getNotifications());
    }
  }, [dispatch, isNotificationsFetched]);

  useFocusEffect(() => {
    fetchData();
  });

  return (
    <View style={homeStyles.outerContainer}>
      <SafeAreaView style={homeStyles.container}>
        <Header navigation={navigation} setSearchText={() => {}} />

        {isNotificationsFirstRequest ? <Loading /> : <NotificationsList />}
      </SafeAreaView>
    </View>
  );
};

export default Notifications;
