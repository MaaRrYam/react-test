import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {IconProps} from '@/interfaces';
const Notifications = (props: IconProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.isFocused ? 'black' : '#929292'}
        d={
          props.isFocused
            ? 'M7.07 20.57a4.752 4.752 0 0 0 8.716 0H7.07ZM21.327 12.522l-1.654-5.45a8.877 8.877 0 0 0-17.215.432l-1.284 5.274a4.762 4.762 0 0 0 4.627 5.888h10.968a4.762 4.762 0 0 0 4.558-6.144Z'
            : 'm21.482 13.584-1.81-6.511a8.877 8.877 0 0 0-17.218.451l-1.401 6.3A4.762 4.762 0 0 0 5.7 19.62h1.061a4.762 4.762 0 0 0 9.334 0h.798a4.761 4.761 0 0 0 4.588-6.037Zm-10.053 7.94a2.857 2.857 0 0 1-2.682-1.904h5.364a2.857 2.857 0 0 1-2.682 1.904Zm7.74-4.938a2.835 2.835 0 0 1-2.276 1.129H5.7a2.858 2.858 0 0 1-2.788-3.477l1.4-6.301a6.972 6.972 0 0 1 13.524-.354l1.81 6.51a2.836 2.836 0 0 1-.479 2.493Z'
        }
      />
    </G>
  </Svg>
);
export default Notifications;
