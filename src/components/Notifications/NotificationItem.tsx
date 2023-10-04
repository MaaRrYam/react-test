import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
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
          <Image
            source={
              item.sender && item.sender.photoUrl
                ? {uri: item.sender?.photoUrl}
                : require('@/assets/images/user.png')
            }
            style={styles.notificationItemImage}
          />
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
