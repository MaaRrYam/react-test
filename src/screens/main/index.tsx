import React, {useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import {UserCredential} from 'firebase/auth';

import {Button, SocialLoginButton} from '@/components';
import {COLORS} from '@/constants';
import {SignInScreenProps} from '@/types';
import {_signInWithGoogle} from '@/services/auth/Google';
import SigninService from '@/services/signin';
import {styles} from '@/styles/main';

// const auth = getAuth();
const Main: React.FC<SignInScreenProps> = ({navigation}) => {
  const [user, setUser] = useState<UserCredential>();
  const handleSignButtonClick = () => {
    navigation.navigate('Signin');
  };

  const handleGoogleSign = async () => {
    await _signInWithGoogle(setUser);
    console.log('user', user);
    try {
      await SigninService.checkIfUserIsWhitelisted(
        user as UserCredential,
        navigation,
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.imagesContainer}>
          <Image
            source={require('assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Image
            source={require('assets/images/people.png')}
            style={styles.peopleImage}
            resizeMode="contain"
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center', // Center horizontally
            marginVertical: 20,
          }}>
          <View
            style={{
              flex: 1, // This view will take up as much space as available between dividers
              height: 1,
              backgroundColor: COLORS.border,
            }}
          />
          <View style={{marginHorizontal: 10}}>
            <Text style={{color: 'black'}}>or</Text>
          </View>
          <View
            style={{
              flex: 1, // This view will take up as much space as available between dividers
              height: 1,
              backgroundColor: COLORS.border,
            }}
          />
        </View>

        <View>
          <Button
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
          <Button
            title="Sign In"
            onPress={handleSignButtonClick}
            style={[
              styles.socialsButtonContainer,
              {marginVertical: 20, fontWeight: 300},
            ]}
            textColor={COLORS.primary}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Main;
