import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const ArrowDown = () => {
  return (
    <View style={styles.container}>
      <Svg width={13} height={8} viewBox="0 0 13 8">
        <Path
          d="M1.60961 0.875H11.3921C11.5652 0.875726 11.7341 0.927749 11.8776 1.02449C12.0211 1.12123 12.1327 1.25835 12.1982 1.4185C12.2638 1.57866 12.2804 1.75465 12.2459 1.92424C12.2115 2.09383 12.1275 2.24939 12.0046 2.37125L7.12211 7.25375C7.04077 7.33576 6.94399 7.40086 6.83737 7.44528C6.73074 7.4897 6.61637 7.51257 6.50086 7.51257C6.38535 7.51257 6.27099 7.4897 6.16436 7.44528C6.05773 7.40086 5.96096 7.33576 5.87961 7.25375L0.997113 2.37125C0.874244 2.24939 0.790269 2.09383 0.755807 1.92424C0.721345 1.75465 0.737943 1.57866 0.803503 1.4185C0.869063 1.25835 0.98064 1.12123 1.12413 1.02449C1.26761 0.927749 1.43656 0.875726 1.60961 0.875Z"
          fill="black"
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

export default ArrowDown;
