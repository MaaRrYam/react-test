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

const windowWidth = Dimensions.get('window').width;
const containerWidth = windowWidth - 50;

const auth = getAuth();
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
          <Text
            style={{
              color: 'black',
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              marginLeft: '27%',
            }}>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  imagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    maxHeight: '45%',
  },
  logo: {
    width: windowWidth - 180,
    height: '30%',
    marginTop: 50,
  },
  peopleImage: {
    width: windowWidth - 80,
    height: '70%',
    marginLeft: 30,
  },
  inputContainer: {
    width: containerWidth,
  },
  btnContainer: {
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
  },
  socialsButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Google Blue
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: 'black',
    fontWeight: '400',
  },
  iconContainer: {
    marginRight: 10,
  },
  signinButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Main;
