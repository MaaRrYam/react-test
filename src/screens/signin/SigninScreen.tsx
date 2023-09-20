import {Button, SocialLoginButton} from '@/components';
import {COLORS} from '@/constants';
import {_signInWithGoogle} from '@/services/auth/Google';
import SigninService from '@/services/signin';
import {SignInScreenProps} from '@/types';
import {UserCredential} from '@firebase/auth';
import React, {FC, useState} from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';

import {styles} from '@/styles/signinScreen';

const SigninScreen: FC<SignInScreenProps> = ({navigation}) => {
  const [user, setUser] = useState<any>();
  const handleGoogleSign = async () => {
    await _signInWithGoogle(setUser);
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <Image
          source={require('assets/images/logo.png')}
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center', // Center horizontally
            marginTop: 57,
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
            onPress={() => navigation.navigate('SigninWithEmail')}
            title="Sign in with email"
            textColor="white"
            style={{marginTop: 30}}
          />
        </View>

        <View style={{marginTop: 150, marginLeft: 8, flexDirection: 'row'}}>
          <Text style={{color: 'black'}}>Don't have an Account? </Text>
          <Text
            style={{color: COLORS.primary}}
            onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SigninScreen;
