import React from 'react';
import {SafeAreaView, View} from 'react-native';

import {homeStyles} from '@/styles/home';
import {Header, NotificationItem} from '@/components';
import {NotificationsScreenProps} from '@/types';
import {NOTIFICATIONS} from '@/constants';
import {FlatList} from 'react-native';

const Notifications: React.FC<NotificationsScreenProps> = ({navigation}) => {
  return (
    <View style={homeStyles.outerContainer}>
      <SafeAreaView style={homeStyles.container}>
        <Header navigation={navigation} />

        <FlatList
          data={NOTIFICATIONS}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <NotificationItem item={item} />}
        />
      </SafeAreaView>
    </View>
  );
};

export default Notifications;
