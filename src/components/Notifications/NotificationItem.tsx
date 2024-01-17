import React, {useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {StackNavigationProp} from '@react-navigation/stack';

import {COLORS} from '@/constants';
import {RoundedButton} from '@/components';
import {NotificationInterface} from '@/interfaces';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/types';

const renderUI = (item: NotificationInterface) => {
  return (
    <View
      style={[
        styles.notificationItem,
        item?.isUnRead && styles.unReadNotificationItem,
      ]}>
      <View style={styles.notificationItemImage}>
        {item?.sender?.photoUrl ? (
          <FastImage
            source={{
              uri: item.sender?.photoUrl,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.notificationItemImage}
          />
        ) : (
          <Image
            style={styles.notificationItemImage}
            source={require('@/assets/images/user.png')}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.notificationItemContent}>
        <View style={styles.notificationItemHeader}>
          <Text style={styles.notificationItemMessage}>{item.description}</Text>
        </View>
        {item?.isUnRead && (
          <View style={styles.notificationItemMessage}>
            <RoundedButton text="Connect" onPress={() => console.log('LOL')} />
          </View>
        )}
      </View>
    </View>
  );
};

const NotificationItem = ({item}: {item: NotificationInterface}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = useCallback(() => {
    const splittedUrl = item.mobileLink?.split('/');

    if (splittedUrl?.[1] === 'post') {
      navigation.navigate('Post', {
        id: splittedUrl?.[2],
      });
    } else {
      navigation.navigate('Profile', {
        uid: splittedUrl![1],
        user: item.sender,
      });
    }
  }, [item.mobileLink, item.sender, navigation]);

  return (
    <>
      {item.mobileLink ? (
        <>
          <TouchableOpacity onPress={handlePress}>
            {renderUI(item)}
          </TouchableOpacity>
        </>
      ) : (
        renderUI(item)
      )}
    </>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  unReadNotificationItem: {
    backgroundColor: COLORS.lightBlueBackground,
  },
  notificationItemImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 8,
  },
  notificationItemContent: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
  },

  notificationItemHeader: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationItemMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: COLORS.black,
  },
});

export default NotificationItem;
