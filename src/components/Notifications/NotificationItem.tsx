import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import {COLORS} from '@/constants';
import {RoundedButton} from '../Buttons';
import {NotificationInterface} from '@/interfaces';

const NotificationItem = ({
  item,
  onPress,
}: {
  item: NotificationInterface;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
            <Text style={styles.notificationItemMessage}>
              {item.description}
            </Text>
          </View>
          {item?.isUnRead && (
            <View style={styles.notificationItemMessage}>
              <RoundedButton
                text="Connect"
                onPress={() => console.log('LOL')}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
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
