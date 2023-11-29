import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import {PrimaryButton} from '@/components';
import {COLORS, SCREEN_NAMES} from '@/constants';
import {HomeScreenProps} from '@/types';
import OnboardingService from '@/services/onboarding';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const containerWidth = windowWidth - 50;

const OnboardingCompleted: React.FC<HomeScreenProps> = ({navigation}) => {
  const handleOnboardingCompleted = async () => {
    OnboardingService.onboardingCompleted();
    navigation.navigate(SCREEN_NAMES.BottomNavigator);
  };

  return (
    <LinearGradient colors={['#2356F6', '#6EF0D3']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imagesContainer}>
          <FastImage
            source={require('assets/images/whiteLogo.png')}
            style={styles.logo}
            resizeMode="cover"
          />
          <Text style={styles.welcome}>Welcome Onboard!</Text>
        </View>

        <View style={styles.middleImageContainer}>
          <FastImage
            source={require('assets/images/completeOnboarding.png')}
            style={styles.middleImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.btnContainer}>
          <PrimaryButton
            title="Explore CareerNetwork.co"
            onPress={() => handleOnboardingCompleted()}
            textColor={COLORS.black}
            backgroundColor={COLORS.white}
            icon="arrow-right"
            iconPosition="right"
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: containerWidth,
    marginHorizontal: 20,
  },
  imagesContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  middleImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  gradient: {
    flex: 1,
  },
  logo: {
    width: windowWidth - 180,
    height: windowHeight * 0.15,
  },
  middleImage: {
    width: windowWidth,
    height: windowHeight * 0.5,
  },
  welcome: {
    fontSize: 32,
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: -30,
  },
  btnContainer: {
    alignItems: 'center',
  },
  button: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    borderRadius: 10,
    marginBottom: 50,
  },
});

export default OnboardingCompleted;
