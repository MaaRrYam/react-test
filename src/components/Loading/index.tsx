import React, {useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {styles} from './styles';

const Loading = () => {
  const loadingViewRef = useRef<Animatable.View>(null);
  const emblemRef = useRef<Animatable.Image>(null);

  useEffect(() => {
    // Start the animation when the component mounts
    startAnimation();
  }, []);

  const startAnimation = () => {
    // Customize your animation here
    // Example: You can use any animation type from react-native-animatable, like 'fadeIn', 'slideInUp', etc.
    if (loadingViewRef.current && emblemRef.current) {
      loadingViewRef.current.fadeIn(2000); // 2000ms (2 seconds) duration for the fadeIn animation
      emblemRef.current.rotate(2000); // 2000ms (2 seconds) duration for continuous rotation
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        ref={loadingViewRef}
        style={styles.innerContainer}
        animation="fadeIn"
        duration={2000}>
        <Animatable.Image
          ref={emblemRef}
          style={styles.loader}
          source={require('@/assets/images/emblem.png')} // Make sure to use the correct image path
          resizeMode="contain"
          animation="rotate"
          iterationCount="infinite" // Keep rotating infinitely
          easing="linear" // Linear easing for continuous rotation
        />
        <Text style={styles.text}>Loading...</Text>
      </Animatable.View>
    </View>
  );
};

export default Loading;
