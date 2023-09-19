import {Button, SocialLoginButton} from '@/components';
import {COLORS, FONTS} from '@/constants';
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
            alignContent: 'center',
            marginTop: 38,
          }}>
          <View
            style={{width: 151.803, height: 1, backgroundColor: COLORS.border}}>
            <Text style={{color: 'black'}}>.</Text>
          </View>
          <View style={{marginLeft: 8, marginRight: 8}}>
            <Text style={{color: 'black', marginBottom: 3}}>or</Text>
          </View>
          <View
            style={{width: 151.803, height: 1, backgroundColor: COLORS.border}}>
            <Text style={{color: 'black'}}>.</Text>
          </View>
        </View>

        <View>
          <Button
            onPress={() => navigation.navigate('SigninWithEmail')}
            title="Sign in with email"
            textColor="white"
            style={{marginTop: 46}}
          />
        </View>

        <View style={{marginTop: 120, marginLeft: 8, flexDirection: 'row'}}>
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
