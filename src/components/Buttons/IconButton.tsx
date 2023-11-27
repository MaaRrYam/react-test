import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {COLORS} from '@/constants';

interface IconButtonProps {
  imageSource: number;
  onPress: () => void;
  style?: object;
  iconSize?: number;
}

const IconButton = ({
  imageSource,
  onPress,
  style,
  iconSize = 24,
}: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <FastImage
        resizeMode="cover"
        source={imageSource}
        style={{width: iconSize, height: iconSize}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 5,
  },
});

export default IconButton;
