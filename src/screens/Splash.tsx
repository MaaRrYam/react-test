import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const SplashScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <FastImage
        source={{
          uri: require('../assets/images/logo.png'),
          priority: 'normal',
          cache: 'immutable',
        }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
});

export default SplashScreen;
