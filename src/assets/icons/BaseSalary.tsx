import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Svg, Rect, Path, Mask, G} from 'react-native-svg';

const BaseSalary = () => (
  <View style={styles.container}>
    <Svg width={24} height={24} viewBox="0 0 17 17" fill="none">
      <Mask
        id="mask0"
        maskType="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={24}
        height={24}>
        <Rect y="0.121094" width={16.5601} height={16.5601} fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0)">
        <Path
          d="M4.48478 10.4519V9.76193H2.75977V8.38192H6.20979V7.00191H3.44977C3.25427 7.00191 3.09028 6.93590 2.95780 6.80388C2.82578 6.67139 2.75977 6.50740 2.75977 6.31190V3.55188C2.75977 3.35638 2.82578 3.19239 2.95780 3.05991C3.09028 2.92789 3.25427 2.86188 3.44977 2.86188H4.48478V2.17188H5.86479V2.86188H7.58980V4.24189H4.13977V5.62190H6.89979C7.09529 5.62190 7.25929 5.68791 7.39177 5.81993C7.52379 5.95241 7.58980 6.11640 7.58980 6.31190V9.07192C7.58980 9.26742 7.52379 9.43141 7.39177 9.56389C7.25929 9.69591 7.09529 9.76193 6.89979 9.76193H5.86479V10.4519H4.48478ZM9.62531 14.592L6.69279 11.6594L7.65880 10.6934L9.62531 12.6599L13.5238 8.76142L14.4898 9.72743L9.62531 14.592Z"
          fill="#8C8C8C"
        />
      </G>
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
    marginTop: 5,
  },
});

export default BaseSalary;
