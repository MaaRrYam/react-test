import React from 'react';
import {Home, Network, Notifications, Jobs, ImageIcon} from '@/assets/icons';
import {Image, StyleSheet} from 'react-native';
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
      return photoUrl ? (
        <Image
          source={{uri: photoUrl}}
          style={styles.image}
        />
      ) : (
        <ImageIcon />
      );
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
