import React from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Image,
} from 'react-native';

import {PrimaryButton, SocialLoginButton} from '@/components';
import {COLORS} from '@/constants';
import {LaunchScreenProps} from '@/types';
import {_signInWithGoogle} from '@/services/auth/Google';
import {_signInWithApple} from '@/services/auth/Apple';
import {styles} from '@/styles/main';
import {useAppDispatch} from '@/hooks/useAppDispatch';

const Main: React.FC<LaunchScreenProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const handleSignButtonClick = () => {
    navigation.navigate('Signin');
  };

  const handleGoogleSign = async () => {
    await _signInWithGoogle(navigation, dispatch);
  };

  const handleAppleSignIn = async () => {
    await _signInWithApple(navigation, dispatch);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.imagesContainer}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode={'contain'}
          />
          <Image
            source={require('@/assets/images/people.png')}
            style={styles.peopleImage}
            resizeMode={'contain'}
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
          {Platform.OS === 'ios' && (
            <SocialLoginButton
              logoSource={require('@/assets/images/apple.png')}
              onPress={handleAppleSignIn}
              text="Sign up with Apple"
              style={{marginTop: 14.61}}
            />
          )}
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
            onPress={() => navigation.navigate('Signup')}
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
