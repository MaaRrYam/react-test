import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path, Defs, ClipPath, Rect} from 'react-native-svg';
const Cross = () => {
  return (
    <View style={styles.container}>
      <Svg width={15} height={15} viewBox="0 0 15 15">
        <Defs>
          <ClipPath id="clip0">
            <Rect width={15} height={15} fill="white" />
          </ClipPath>
        </Defs>
        <Path
          d="M8.8236 7.50388L14.7234 1.60476C15.0896 1.23854 15.0896 0.644771 14.7234 0.278575C14.3571 -0.0876501 13.7634 -0.0876501 13.3972 0.278575L7.49803 6.17831L1.5989 0.278575C1.23268 -0.0876501 0.638912 -0.0876501 0.272716 0.278575C-0.0934801 0.6448 -0.0935094 1.23857 0.272716 1.60476L6.17245 7.50388L0.272716 13.403C-0.0935094 13.7693 -0.0935094 14.363 0.272716 14.7292C0.638941 15.0954 1.23271 15.0954 1.5989 14.7292L7.49803 8.82946L13.3971 14.7292C13.7634 15.0954 14.3571 15.0954 14.7233 14.7292C15.0896 14.363 15.0896 13.7692 14.7233 13.403L8.8236 7.50388Z"
          fill="black"
          clipPath="url(#clip0)"
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

export default Cross;
