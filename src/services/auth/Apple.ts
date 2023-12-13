import auth from '@react-native-firebase/auth';
import {User, UserCredential} from 'firebase/auth';
import SigninService from '@/services/signin';
import {RootStackParamList} from '@/types';
import {NavigationProp} from '@react-navigation/native';

import {appleAuth} from '@invertase/react-native-apple-authentication';
import ToastService from '../toast';

export const _signInWithApple = async (
  navigation: NavigationProp<RootStackParamList>,
  dispatch: any,
) => {
  try {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
      // See: https://github.com/invertase/react-native-apple-authentication#faqs
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );
    console.log({appleCredential});

    // Sign the user in with the credential
    const userCredential: UserCredential = await auth().signInWithCredential(
      appleCredential,
    );

    // Retrieve user information from the user object
    const user: User | null = userCredential.user;

    console.log({user});
    if (!user) {
      throw new Error('User not found after signing in with Apple');
    }

    // Call the service to check if the user is whitelisted
    await SigninService.checkIfUserIsWhitelisted(
      userCredential,
      navigation,
      dispatch,
    );

    return {success: true, message: 'Successfully Signed In', data: user};
  } catch (error: any) {
    console.log(error);
    ToastService.showError('Something went wrong');
    return {success: false, message: error, data: null};
  }
};
