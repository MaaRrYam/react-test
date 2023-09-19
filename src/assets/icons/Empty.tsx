import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle, Line} from 'react-native-svg';

const NotFoundIcon = () => {
  return (
    <View style={styles.icon}>
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          strokeWidth="10"
          fill="none"
        />
        <Line x1="30" y1="30" x2="70" y2="70" stroke="black" strokeWidth="10" />
        <Line x1="30" y1="70" x2="70" y2="30" stroke="black" strokeWidth="10" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotFoundIcon;
