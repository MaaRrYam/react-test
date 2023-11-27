import React from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {PrimaryButton, SocialLoginButton} from '@/components';
import {COLORS, SCREEN_NAMES} from '@/constants';
import {LaunchScreenProps} from '@/types';
import {_signInWithGoogle} from '@/services/auth/Google';
import {styles} from '@/styles/main';
import {useAppDispatch} from '@/hooks/useAppDispatch';

const Main: React.FC<LaunchScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const handleSignButtonClick = () => {
    navigation.navigate(SCREEN_NAMES.Signin);
  };

  const handleGoogleSign = async () => {
    await _signInWithGoogle(navigation, dispatch);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.imagesContainer}>
          <FastImage
            source={{
              uri: require('@/assets/images/logo.png'),
              priority: 'normal',
            }}
            style={styles.logo}
            resizeMode={FastImage.resizeMode.cover}
          />
          <FastImage
            source={{
              uri: require('@/assets/images/people.png'),
              priority: 'normal',
            }}
            style={styles.peopleImage}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View>
          <SocialLoginButton
            logoSource={require('@/assets/images/google.png')}
            onPress={handleGoogleSign}
            text="Sign up with Google"
            style={{marginTop: 44}}
          />
          <SocialLoginButton
            logoSource={require('@/assets/images/x.png')}
            onPress={() => {}}
            text="Sign up with Twitter"
            style={{marginTop: 14.61}}
          />
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.orDivider} />
          <View style={styles.dividerMargin}>
            <Text style={styles.text}>or</Text>
          </View>
          <View style={styles.orDivider} />
        </View>

        <View>
          <PrimaryButton
            title="Create Account"
            onPress={() => navigation.navigate(SCREEN_NAMES.Signup)}
            style={{}}
            activityIndicatorColor={COLORS.white}
          />
        </View>

        <View>
          <Text style={styles.alreadyHaveAnAccount}>
            Already have an account?{' '}
          </Text>
        </View>

        <View>
          <PrimaryButton
            title="Sign In"
            onPress={handleSignButtonClick}
            style={styles.signInButton}
            textColor={COLORS.primary}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Main;
