import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const NewChatIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G fill="#000" clipPath="url(#a)">
      <Path d="M15.546 1.28 5.386 11.44a4.137 4.137 0 0 0-1.22 2.946v1.12a.833.833 0 0 0 .833.833h1.12a4.138 4.138 0 0 0 2.945-1.22l10.16-10.16a2.604 2.604 0 0 0 0-3.678 2.662 2.662 0 0 0-3.678 0Zm2.5 2.5L7.886 13.94c-.47.468-1.105.73-1.767.732h-.286v-.286a2.517 2.517 0 0 1 .731-1.767l10.16-10.16a.957.957 0 0 1 1.322 0 .936.936 0 0 1 0 1.322Z" />
      <Path d="M19.167 7.986a.833.833 0 0 0-.834.834v4.184H15a2.5 2.5 0 0 0-2.5 2.5v3.333H4.167a2.5 2.5 0 0 1-2.5-2.5V4.671a2.5 2.5 0 0 1 2.5-2.5h7.535a.833.833 0 0 0 0-1.667H4.167A4.172 4.172 0 0 0 0 4.67v11.666a4.172 4.172 0 0 0 4.167 4.167h9.452a4.14 4.14 0 0 0 2.947-1.22l2.213-2.215A4.14 4.14 0 0 0 20 14.123V8.82a.833.833 0 0 0-.833-.834Zm-3.78 10.12a2.48 2.48 0 0 1-1.22.666v-3.268A.833.833 0 0 1 15 14.67h3.27a2.514 2.514 0 0 1-.666 1.22l-2.216 2.215Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .504h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default NewChatIcon;
