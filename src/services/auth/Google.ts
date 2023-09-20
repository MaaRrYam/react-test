import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {UserCredential} from 'firebase/auth';
import SigninService from '../signin';

export const _signInWithGoogle = async (
  // setUser: (value: UserCredential) => void,
  navigation: any,
) => {
  try {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId:
        '644352516404-pmu9mae4ggm7esmfsuk0nusvh1k4qbok.apps.googleusercontent.com',
    });

    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const {idToken} = await GoogleSignin.signIn();
    const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
    auth()
      .signInWithCredential(googleCredentials)
      .then(async (userCredential: UserCredential) => {
        await SigninService.checkIfUserIsWhitelisted(
          userCredential,
          navigation,
        );
      });

    return {success: true, message: 'Successfully Signed In', data: userInfo};
  } catch (error: any) {
    console.log(error);
    return {success: false, message: error, data: null};
  }
};
