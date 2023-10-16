import React, {FC} from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';

import {Button, SocialLoginButton} from '@/components';
import {SCREEN_NAMES} from '@/constants';
import {_signInWithGoogle} from '@/services/auth/Google';
import {SignInScreenProps} from '@/types';
import {styles} from '@/styles/signinScreen';

const SigninScreen: FC<SignInScreenProps> = ({navigation}) => {
  const handleGoogleSign = async () => {
    await _signInWithGoogle(navigation);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View>
          <Text style={styles.headingTitle}>Sign in</Text>
        </View>

        <View>
          <SocialLoginButton
            logoSource={require('@/assets/images/google.png')}
            onPress={handleGoogleSign}
            text="Sign in with Google"
            style={{marginTop: 44}}
          />
          <SocialLoginButton
            logoSource={require('@/assets/images/x.png')}
            onPress={() => {}}
            text="Sign in with X"
            style={{marginTop: 14.61}}
          />
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <View style={styles.dividerMargin}>
            <Text style={styles.text}>or</Text>
          </View>
          <View style={styles.divider} />
        </View>

        <View>
          <Button
            onPress={() => navigation.navigate(SCREEN_NAMES.SigninWithEmail)}
            title="Sign in with email"
            textColor="white"
            style={styles.signInWithEmailButton}
          />
        </View>

        <View style={styles.alreadyHaveAnAccount}>
          <Text style={styles.text}>Don't have an Account? </Text>
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate(SCREEN_NAMES.Signup)}>
            Sign up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SigninScreen;
