import {OnboardingScreens} from '@/utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';

const BackButton = ({
  onPress,
  isBgWhite,
  style,
}: {
  onPress?: () => void;
  isBgWhite?: boolean;
  style?: object;
}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleNavigation = () => {
    /**
     * if onboarding screens, go back to previous screen
     */

    if (OnboardingScreens.includes(route.name)) {
      const currentRouteIndex = OnboardingScreens.indexOf(route.name);
      const previousRoute = OnboardingScreens[currentRouteIndex - 1];
      return navigation.navigate(previousRoute);
    }

    navigation.goBack();
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, isBgWhite && styles.whiteBackground, style]}
      onPress={handleNavigation}>
      <Image
        source={require('../../assets/images/back.png')}
        style={styles.icon}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    width: 50,
    borderRadius: 12,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default BackButton;
