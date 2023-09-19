import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {styles} from './styles';
import {COLORS} from '@/constants';
import {LoadingProps} from '@/interfaces';

const Loading = ({
  size,
  color,
  containerStyles,
  indicatorStyles,
}: LoadingProps) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <ActivityIndicator
        size={size || 'large'}
        color={color || COLORS.primary}
        style={indicatorStyles}
      />
    </View>
  );
};

export default Loading;
