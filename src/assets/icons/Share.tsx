import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const Share = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#1C1C1C"
        d="M19.557 1.192a2.472 2.472 0 0 0-2.334-.667L3.89 3.333a4.163 4.163 0 0 0-2.378 7.068l1.432 1.43a.834.834 0 0 1 .244.59v2.64c.002.372.088.738.25 1.071l-.006.006.021.022a2.5 2.5 0 0 0 1.135 1.13l.022.021.006-.006c.333.163.7.248 1.07.25h2.64c.221 0 .433.087.59.243l1.43 1.431a4.134 4.134 0 0 0 4.271 1.008 4.11 4.11 0 0 0 2.787-3.322l2.813-13.363a2.48 2.48 0 0 0-.66-2.36ZM4.124 10.655 2.692 9.224a2.45 2.45 0 0 1-.602-2.562 2.482 2.482 0 0 1 2.083-1.688l13.201-2.78-12.52 12.523v-2.296a2.482 2.482 0 0 0-.73-1.766Zm11.643 5.975a2.5 2.5 0 0 1-4.241 1.427l-1.434-1.434a2.482 2.482 0 0 0-1.765-.732H6.03L18.553 3.373 15.767 16.63Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.291.457h20v20h-20z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Share;
