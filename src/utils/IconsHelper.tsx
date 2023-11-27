import React from 'react';
import {Home, Network, Notifications, Jobs, ImageIcon} from '@/assets/icons';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BORDER_RADIUS} from '@/constants';
import FastImage from 'react-native-fast-image';

export const getIcon = (
  label: string,
  isFocused: boolean,
  navigation: any,
  photoUrl?: string,
  uid?: string,
) => {
  // const navigation = useNavigation();
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
      if (photoUrl && uid) {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {uid})}>
            <FastImage
              source={{uri: photoUrl, priority: 'high', cache: 'immutable'}}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
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
