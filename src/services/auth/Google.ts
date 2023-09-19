import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {UserCredential} from 'firebase/auth';

export const _signInWithGoogle = async (
  setUser: (value: UserCredential) => void,
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
      .then(async userCredential => {
        await setUser(userCredential);
      });

    return {success: true, message: 'Successfully Signed In', data: userInfo};
  } catch (error: any) {
    console.log(error);
    return {success: false, message: error, data: null};
  }
};
