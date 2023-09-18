import {Button, SocialLoginButton} from '@/components';
import {COLORS, FONTS} from '@/constants';
import {_signInWithGoogle} from '@/services/auth/Google';
import SigninService from '@/services/signin';
import {SignInScreenProps} from '@/types';
import {UserCredential} from '@firebase/auth';
import  React, {FC, useState} from 'react';
import {View, StyleSheet, Text, Image, Dimensions,Platform, SafeAreaView} from 'react-native';
import {Input} from '@/components'
const windowWidth = Dimensions.get('window').width;
// const containerWidth = windowWidth - 50;
const SigninScreen: FC<SignInScreenProps> = ({navigation}) => {
  const [user, setUser] = useState<any>();
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
          text="Sign up with Google"
          marginTop={50}
        />
        <SocialLoginButton
          logoSource={require('@/assets/images/x.png')}
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
          marginTop: 58,
        }}>
        <View
          style={{width: 151.803, height: 1, backgroundColor: COLORS.border}}>
          <Text style={{color: 'black'}}>.</Text>
        </View>
        <View style={{marginHorizontal: 6}}>
          <Text style={{color: 'black', marginBottom: 3}}>or</Text>
        </View>
        <View
          style={{width: 151.803, height: 1, backgroundColor: COLORS.border}}>
          <Text style={{color: 'black'}}>.</Text>
        </View>
      </View>

      <View>
        <Button
          onPress={() => {}}
          title="Sign in with email"
          textColor="white"
          style={{marginTop: 46}}
        />
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: Platform.OS === 'ios' ? 20 : 30,
      },
  mainContainer: {
    color: 'black',
    paddingLeft: 25,
    paddingRight: 20,
  },
  mainText: {
    color: 'black',
  },
  logo: {
    width: windowWidth - 180,
    height: '30%',
    marginTop: 20,
    borderWidth: 2,
    borderColor: "black"
  },
  headingTitle: {
    fontSize: FONTS.heading,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default SigninScreen;
