import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const Comment = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G fill="#1C1C1C" clipPath="url(#a)">
      <Path d="M20.29 9.83a10.01 10.01 0 1 0-9.986 10.627h5.82a4.17 4.17 0 0 0 4.166-4.166V9.83Zm-1.667 6.46a2.5 2.5 0 0 1-2.5 2.5h-5.819a8.367 8.367 0 0 1-7.966-5.818 8.264 8.264 0 0 1-.327-3.479 8.37 8.37 0 0 1 7.213-7.3c.36-.046.721-.068 1.083-.069a8.267 8.267 0 0 1 5.316 1.917 8.366 8.366 0 0 1 3 5.868v6.382Z" />
      <Path d="M6.956 7.956h3.334a.833.833 0 0 0 0-1.667H6.956a.833.833 0 0 0 0 1.667ZM13.623 9.625H6.956a.833.833 0 0 0 0 1.667h6.667a.833.833 0 1 0 0-1.667ZM13.623 12.957H6.956a.833.833 0 0 0 0 1.667h6.667a.833.833 0 1 0 0-1.667Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.291.457h20v20h-20z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Comment;
