import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const Report = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#1C1C1C"
        d="M16.958 3.79H12.79A3.333 3.333 0 0 0 9.458.457H3.624A3.333 3.333 0 0 0 .291 3.79v15.834a.833.833 0 0 0 1.667 0V11.29h6.666a3.333 3.333 0 0 0 3.334 3.334h5a3.333 3.333 0 0 0 3.333-3.334V7.124a3.333 3.333 0 0 0-3.333-3.334Zm-15 5.834V3.79a1.667 1.667 0 0 1 1.666-1.666h5.834a1.667 1.667 0 0 1 1.666 1.666v4.167a1.666 1.666 0 0 1-1.666 1.667h-7.5Zm16.666 1.666a1.667 1.667 0 0 1-1.666 1.667h-5a1.667 1.667 0 0 1-1.667-1.667v-.118a3.333 3.333 0 0 0 2.5-3.215v-2.5h4.167a1.667 1.667 0 0 1 1.666 1.667v4.166Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.291.457h20v20h-20z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Report;
