import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const CheckMark = () => {
  return (
    <View style={styles.container}>
      <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
        <Path
          d="M11.6673 3.79297L5.25065 10.2096L2.33398 7.29297"
          stroke="white"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CheckMark;
