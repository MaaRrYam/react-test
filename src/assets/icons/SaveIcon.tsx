import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Svg, Rect, Path, Defs, ClipPath} from 'react-native-svg';

const SaveIcon = () => (
  <View style={styles.container}>
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="clip0_8741_4041">
          <Rect width={24} height={24} fill="white" />
        </ClipPath>
      </Defs>
      <Path
        d="M2.37496 19.625C2.83 19.8195 3.33309 19.8723 3.81859 19.7765C4.30409 19.6808 4.74947 19.441 5.09663 19.0883L10.0008 14.2108L14.905 19.0883C15.1336 19.3203 15.406 19.5047 15.7064 19.6307C16.0068 19.7567 16.3292 19.8219 16.655 19.8225C16.9898 19.8215 17.3211 19.7544 17.63 19.625C18.0887 19.4393 18.4808 19.1197 18.7551 18.7077C19.0294 18.2958 19.1731 17.8107 19.1675 17.3158V4.16667C19.1661 3.062 18.7267 2.00296 17.9456 1.22185C17.1645 0.440735 16.1055 0.00132321 15.0008 0L5.0008 0C3.89613 0.00132321 2.83709 0.440735 2.05598 1.22185C1.27486 2.00296 0.835453 3.062 0.834129 4.16667V17.3158C0.828752 17.8111 0.972943 18.2964 1.24785 18.7084C1.52276 19.1204 1.91558 19.4399 2.37496 19.625Z"
        fill="black"
        clipPath="url(#clip0_8741_4041)"
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

export default SaveIcon;
