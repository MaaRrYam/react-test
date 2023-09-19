import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const Search = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        d="m19.755 18.577-4.974-4.974a8.347 8.347 0 1 0-1.178 1.178l4.974 4.974a.833.833 0 0 0 1.178-1.178ZM8.333 14.999a6.667 6.667 0 1 1 6.666-6.666 6.674 6.674 0 0 1-6.666 6.666Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Search;
