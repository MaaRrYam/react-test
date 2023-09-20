import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import {styles} from '@/components/Loading/styles';

const emblemImage = require('@/assets/images/emblem.png');

export default function LoadingScreen() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    startRotation();
  });

  const startRotation = () => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 1000, easing: Easing.linear}),
        withTiming(0, {duration: 0}),
      ),
      -1,
      true,
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value * 360}deg`}],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loader, animatedStyle]}>
        <Image source={emblemImage} style={styles.image} />
      </Animated.View>
    </View>
  );
}
