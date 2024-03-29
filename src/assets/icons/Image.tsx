import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
const ImageIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G fill="#000" clipPath="url(#a)">
      <Path d="M15.837.008H4.171A4.172 4.172 0 0 0 .004 4.174v11.667a4.172 4.172 0 0 0 4.167 4.167h11.666a4.172 4.172 0 0 0 4.167-4.167V4.174A4.172 4.172 0 0 0 15.837.008ZM4.171 1.674h11.666a2.5 2.5 0 0 1 2.5 2.5v11.667a2.459 2.459 0 0 1-.25 1.071l-7.636-7.636a4.167 4.167 0 0 0-5.893 0l-2.887 2.887V4.174a2.5 2.5 0 0 1 2.5-2.5Zm0 16.667a2.5 2.5 0 0 1-2.5-2.5V14.52l4.065-4.066a2.5 2.5 0 0 1 3.536 0l7.636 7.637c-.333.163-.7.249-1.07.25H4.17Z" />
      <Path d="M13.337 8.76a2.916 2.916 0 1 0 0-5.834 2.916 2.916 0 0 0 0 5.833Zm0-4.168a1.25 1.25 0 1 1 0 2.501 1.25 1.25 0 0 1 0-2.5Z" />
    </G>
  </Svg>
);
export default ImageIcon;
