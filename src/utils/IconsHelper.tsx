import React from 'react';
import {Home, Network, Notifications, Jobs, ImageIcon} from '@/assets/icons';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BORDER_RADIUS} from '@/constants';

export const getIcon = (
  label: string,
  isFocused: boolean,
  photoUrl?: string,
) => {
  switch (label) {
    case 'Home':
      return <Home isFocused={isFocused} />;
    case 'Network':
      return <Network isFocused={isFocused} />;
    case 'Notifications':
      return <Notifications isFocused={isFocused} />;
    case 'Jobs':
      return <Jobs isFocused={isFocused} />;
    case 'Profile':
      if (photoUrl) {
        return (
          <FastImage
            source={{
              uri: photoUrl,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        );
      } else {
        return <ImageIcon />;
      }
    default:
      return <Home isFocused={isFocused} />;
  }
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    borderRadius: BORDER_RADIUS.general,
  },
});
