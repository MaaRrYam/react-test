import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import {UserCredential, getAuth} from 'firebase/auth';

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
            logoSource={require('../../assets/images/google.png')}
            onPress={handleGoogleSign}
            text="Sign up with Google"
            marginTop={0}
          />
          <SocialLoginButton
            logoSource={require('../../assets/images/x.png')}
            onPress={() => {}}
            text="Sign up with Twitter"
            marginTop={14.61}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            marginVertical: 20,
          }}>
          <View
            style={{width: 151.803, height: 1, backgroundColor: COLORS.border}}>
            <Text style={{color: 'black'}}>.</Text>
          </View>
          <View style={{marginLeft: 6, marginRight: 6}}>
            <Text style={{color: 'black', marginBottom: 3}}>or</Text>
          </View>
          <View
            style={{width: 151.803, height: 1, backgroundColor: COLORS.border}}>
            <Text style={{color: 'black'}}>.</Text>
          </View>
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
            Already have an Account?{' '}
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
