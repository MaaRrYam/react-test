import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Svg, Rect, Path, Defs, ClipPath} from 'react-native-svg';

const UnsaveIcon = () => (
  <View style={styles.container}>
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="clip0_8741_3864">
          <Rect width={24} height={24} fill="white" />
        </ClipPath>
      </Defs>
      <Path
        d="M16.7816 20C16.4733 19.9992 16.1682 19.9372 15.884 19.8178C15.5998 19.6984 15.3421 19.5238 15.1258 19.3042L10.0008 14.2092L4.87575 19.3075C4.54661 19.6414 4.1245 19.8685 3.66443 19.959C3.20437 20.0495 2.72771 19.9993 2.29659 19.815C1.86118 19.6399 1.48871 19.3375 1.2278 18.9474C0.966896 18.5573 0.829685 18.0976 0.834087 17.6283V4.16667C0.834087 3.0616 1.27307 2.00179 2.05448 1.22039C2.83588 0.438987 3.89568 0 5.00075 0L15.0008 0C15.5479 0 16.0897 0.107774 16.5953 0.317169C17.1008 0.526563 17.5601 0.833478 17.947 1.22039C18.3339 1.6073 18.6409 2.06663 18.8503 2.57215C19.0596 3.07768 19.1674 3.61949 19.1674 4.16667V17.6283C19.1721 18.0972 19.0354 18.5567 18.7751 18.9467C18.5148 19.3368 18.143 19.6393 17.7083 19.815C17.4148 19.9377 17.0997 20.0006 16.7816 20ZM5.00075 1.66667C4.33771 1.66667 3.70183 1.93006 3.23299 2.3989C2.76415 2.86774 2.50075 3.50363 2.50075 4.16667V17.6283C2.50045 17.7672 2.54131 17.903 2.61817 18.0187C2.69503 18.1343 2.80444 18.2246 2.93258 18.2781C3.06072 18.3316 3.20184 18.3459 3.33812 18.3193C3.4744 18.2926 3.59972 18.2262 3.69825 18.1283L9.41742 12.4442C9.57356 12.289 9.78477 12.2018 10.0049 12.2018C10.2251 12.2018 10.4363 12.289 10.5924 12.4442L16.3049 18.1267C16.4035 18.2245 16.5288 18.291 16.6651 18.3176C16.8013 18.3443 16.9425 18.33 17.0706 18.2765C17.1987 18.2229 17.3081 18.1327 17.385 18.017C17.4619 17.9014 17.5027 17.7655 17.5024 17.6267V4.16667C17.5024 3.50363 17.239 2.86774 16.7702 2.3989C16.3013 1.93006 15.6655 1.66667 15.0024 1.66667H5.00075Z"
        fill="black"
        clipPath="url(#clip0_8741_3864)"
      />
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UnsaveIcon;
