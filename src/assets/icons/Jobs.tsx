import * as React from 'react';
import Svg, {G, Path, Mask} from 'react-native-svg';
import {IconProps} from '@/interfaces';

const Jobs = (props: IconProps) => (
  <>
    {props.isFocused ? (
      <Svg width={30} height={30} fill="none" {...props}>
        <Mask
          id="a"
          width={24}
          height={24}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse">
          <Path fill="#D9D9D9" d="M.5 0h32v32H.5z" />
        </Mask>
        <G fill="#000" clipPath="url(#b)">
          <Path d="M23.738 7.24H22.69a4.77 4.77 0 0 0-4.667-3.81H16.12a4.77 4.77 0 0 0-4.667 3.81h-1.047A4.768 4.768 0 0 0 5.643 12v2.857H28.5v-2.857a4.767 4.767 0 0 0-4.762-4.762Zm-10.301 0a2.856 2.856 0 0 1 2.682-1.906h1.904a2.857 2.857 0 0 1 2.682 1.905h-7.268ZM18.023 17.714a.952.952 0 1 1-1.904 0v-.952H5.643v4.762a4.768 4.768 0 0 0 4.762 4.761h13.333a4.768 4.768 0 0 0 4.762-4.761v-4.762H18.023v.952Z" />
        </G>
      </Svg>
    ) : (
      <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)">
          <Path
            fill="#929292"
            d="M18.238 4.24H17.19A4.77 4.77 0 0 0 12.523.43H10.62a4.77 4.77 0 0 0-4.667 3.81H4.904A4.768 4.768 0 0 0 .143 9v9.524a4.768 4.768 0 0 0 4.761 4.762h13.334A4.768 4.768 0 0 0 23 18.525V9a4.768 4.768 0 0 0-4.762-4.762Zm-7.62-1.906h1.905a2.857 2.857 0 0 1 2.682 1.905H7.937a2.857 2.857 0 0 1 2.682-1.905Zm-5.714 3.81h13.334a2.857 2.857 0 0 1 2.857 2.857v2.857H2.047V9.001a2.857 2.857 0 0 1 2.857-2.857Zm13.334 15.238H4.904a2.857 2.857 0 0 1-2.857-2.857v-4.762h8.572v.952a.952.952 0 1 0 1.905 0v-.952h8.571v4.762a2.857 2.857 0 0 1-2.857 2.857Z"
          />
        </G>
      </Svg>
    )}
  </>
);
export default Jobs;
