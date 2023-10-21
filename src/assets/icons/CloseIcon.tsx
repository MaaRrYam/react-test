import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path, Defs, ClipPath, Rect} from 'react-native-svg';

const CloseIcon = () => {
  return (
    <View style={styles.container}>
      <Svg width={15} height={15} viewBox="0 0 15 15">
        <Defs>
          <ClipPath id="clip0">
            <Rect width={15} height={15} fill="white" />
          </ClipPath>
        </Defs>
        <Path
          d="M8.82555 7.50388L14.7253 1.60476C15.0915 1.23854 15.0915 0.644771 14.7253 0.278575C14.3591 -0.0876501 13.7653 -0.0876501 13.3991 0.278575L7.49998 6.17831L1.60085 0.278575C1.23463 -0.0876501 0.640865 -0.0876501 0.274669 0.278575C-0.091527 0.6448 -0.0915563 1.23857 0.274669 1.60476L6.17441 7.50388L0.274669 13.403C-0.0915563 13.7693 -0.0915563 14.363 0.274669 14.7292C0.640894 15.0954 1.23466 15.0954 1.60085 14.7292L7.49998 8.82946L13.3991 14.7292C13.7653 15.0954 14.3591 15.0954 14.7253 14.7292C15.0915 14.363 15.0915 13.7692 14.7253 13.403L8.82555 7.50388Z"
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

export default CloseIcon;
