import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const Dislike = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#1C1C1C"
      d="M5.29 7.082a.833.833 0 0 1 .592.242l3.817 3.825a.833.833 0 0 0 1.183 0l3.816-3.825a.837.837 0 0 1 1.184 1.183l-3.825 3.817a2.55 2.55 0 0 1-3.533 0L4.699 8.507a.834.834 0 0 1 .591-1.425Z"
    />
  </Svg>
);
export default Dislike;
