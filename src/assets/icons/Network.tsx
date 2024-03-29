import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {IconProps} from '@/interfaces';

const Network = (props: IconProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G fill={props.isFocused ? 'black' : '#929292'} clipPath="url(#a)">
      <Path
        d={
          props.isFocused
            ? 'M22.477 11.045h-1.905V9.14a.952.952 0 1 0-1.904 0v1.905h-1.905a.952.952 0 1 0 0 1.904h1.905v1.905a.952.952 0 0 0 1.904 0V12.95h1.905a.952.952 0 1 0 0-1.904ZM9.144 11.999a5.714 5.714 0 1 0 0-11.429 5.714 5.714 0 0 0 0 11.429ZM9.144 13.902a8.581 8.581 0 0 0-8.572 8.572c0 .526.427.952.953.952h15.238a.952.952 0 0 0 .952-.952 8.581 8.581 0 0 0-8.571-8.572Z'
            : 'M22.477 11.045h-1.904V9.14a.952.952 0 0 0-1.905 0v1.905h-1.905a.952.952 0 0 0 0 1.904h1.905v1.905a.952.952 0 1 0 1.905 0V12.95h1.904a.952.952 0 1 0 0-1.904ZM9.144 11.999A5.715 5.715 0 1 0 3.43 6.285a5.72 5.72 0 0 0 5.714 5.714Zm0-9.524a3.81 3.81 0 1 1 0 7.618 3.81 3.81 0 0 1 0-7.618ZM9.144 13.902a8.581 8.581 0 0 0-8.572 8.572.952.952 0 1 0 1.905 0 6.667 6.667 0 0 1 13.333 0 .952.952 0 1 0 1.905 0 8.581 8.581 0 0 0-8.571-8.572Z'
        }
      />
    </G>
  </Svg>
);
export default Network;
