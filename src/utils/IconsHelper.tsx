import React from 'react';
import {Home, Network, Notifications, Jobs, ImageIcon} from '@/assets/icons';
import {Image} from 'react-native';

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
          style={{width: 30, height: 30, borderRadius: 1000}}
        />
      ) : (
        <ImageIcon />
      );
    default:
      return <Home isFocused={isFocused} />;
  }
};
