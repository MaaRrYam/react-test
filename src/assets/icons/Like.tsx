import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

import {ReactionIconProps} from '@/interfaces';
import {COLORS} from '@/constants';

const Like = (props: ReactionIconProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={props.isLiked ? COLORS.primary : '#1C1C1C'}
      d="M15.5 12.918a.833.833 0 0 1-.59-.242l-3.818-3.825a.834.834 0 0 0-1.183 0l-3.817 3.825a.837.837 0 0 1-1.183-1.183l3.825-3.817a2.55 2.55 0 0 1 3.534 0l3.825 3.817a.833.833 0 0 1-.592 1.425Z"
    />
  </Svg>
);
export default Like;
