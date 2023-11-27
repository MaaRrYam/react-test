import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {FONTS, COLORS, SCREEN_NAMES} from '@/constants';
import {RoundedButton} from '../Buttons';
import {NetworkItemProps} from '@/interfaces';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import NetworkService from '@/services/network';
import {
  connectWithSomeone,
  removeConnection,
  unfollow,
} from '@/store/features/networkSlice';
import {useNavigation} from '@react-navigation/native';

const NetworkItem = ({
  item,
  isExploring,
  isConnection,
  isFollowing,
}: NetworkItemProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<null | true>(null);

  const handlePress = async () => {
    setIsLoading(true);
    if (isExploring) {
      const response = await NetworkService.connectWithSomeone(item.id);
      setIsSuccess(true);
      if (response) {
        setTimeout(() => {
          dispatch(connectWithSomeone(item.id));
        }, 2000);
      }
    } else if (isConnection) {
      const response = await NetworkService.removeConnection(item.id);
      setIsSuccess(true);
      if (response) {
        setTimeout(() => {
          dispatch(removeConnection(item.id));
        }, 2000);
      }
    } else if (isFollowing) {
      const response = await NetworkService.removeFollowing(item.id);
      setIsSuccess(true);
      if (response) {
        setTimeout(() => {
          dispatch(unfollow(item.id));
        }, 2000);
      }
    }
    setIsLoading(false);
  };

  const renderControls = () => {
    return (
      <View style={styles.networkItemMessage}>
        {isSuccess ? (
          <Text>
            {isExploring
              ? 'Request Sent'
              : isConnection
              ? 'Connection Removed'
              : isFollowing
              ? 'Un followed'
              : 'Success'}
          </Text>
        ) : (
          <RoundedButton
            text={
              isExploring
                ? 'Connect'
                : isConnection
                ? 'Remove'
                : isFollowing
                ? 'Unfollow'
                : 'Connect'
            }
            onPress={handlePress}
            isLoading={isLoading}
          />
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity>
      <View style={styles.networkItem}>
        <View style={styles.networkItemImage}>
          <FastImage
            resizeMode="cover"
            source={{
              uri: item.photoUrl || require('@/assets/images/user.png'),
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            style={styles.networkItemImage}
          />
        </View>
        <View style={styles.networkItemContent}>
          <View style={styles.networkItemHeader}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(SCREEN_NAMES.Profile, {UID: item.id})
              }>
              <Text style={styles.networkItemName}>{item.name}</Text>
            </TouchableOpacity>
            <Text style={styles.networkItemMessage}>{item.tagline}</Text>
          </View>
          {renderControls()}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  networkItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  networkItemImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 8,
  },
  networkItemContent: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
  },

  networkItemHeader: {
    flex: 1,
    justifyContent: 'center',
  },
  networkItemName: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  networkItemTime: {
    color: COLORS.text,
    fontSize: FONTS.bodySmall,
  },
  networkItemMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default NetworkItem;
