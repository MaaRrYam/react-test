import * as React from 'react';
import Svg, {SvgProps, Mask, Path, G} from 'react-native-svg';
const ForwardArrow = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <Path fill="#D9D9D9" d="M24 0H0v24h24z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#000"
        d="m16.174 13-4.9 4.9c-.2.2-.296.434-.287.7.008.267.112.5.312.7.2.184.434.28.7.288.267.009.5-.087.7-.287l6.6-6.6c.1-.1.171-.209.213-.325.041-.117.062-.242.062-.375 0-.134-.02-.259-.062-.375a.876.876 0 0 0-.213-.325l-6.6-6.6a.933.933 0 0 0-.687-.275c-.275 0-.513.091-.713.275-.2.2-.3.437-.3.712 0 .275.1.513.3.713L16.174 11H5a.967.967 0 0 0-.712.287.967.967 0 0 0-.288.713c0 .283.096.52.288.712.191.192.429.288.712.288h11.175Z"
      />
    </G>
  </Svg>
);
export default ForwardArrow;
