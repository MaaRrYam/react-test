import * as React from 'react';
import Svg, {SvgProps, Mask, Path, G} from 'react-native-svg';
const BackArrow = (props: SvgProps) => (
  <Svg
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    {...props}>
    <Mask
      id="a"
      width={props.width || 24}
      height={props.height || 25}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse">
      <Path fill="#D9D9D9" d="M0 .5h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#000"
        d="m7.826 13.5 4.9 4.9c.2.2.296.434.287.7-.008.267-.112.5-.312.7-.2.184-.434.28-.7.288a.916.916 0 0 1-.7-.287l-6.6-6.6a.878.878 0 0 1-.213-.325 1.107 1.107 0 0 1-.062-.375c0-.134.02-.259.062-.375a.877.877 0 0 1 .213-.325l6.6-6.6a.933.933 0 0 1 .687-.275c.275 0 .513.091.713.275.2.2.3.437.3.712 0 .275-.1.513-.3.713L7.826 11.5H19c.283 0 .52.096.712.287.192.192.288.43.288.713s-.096.52-.288.712a.968.968 0 0 1-.712.288H7.826Z"
      />
    </G>
  </Svg>
);
export default BackArrow;
