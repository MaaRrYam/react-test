import {Dimensions} from 'react-native';
import {ScreenDimensions} from '@/interfaces';
import StorageService from '@/services/Storage'; 

export const getScreenDimensions = (): ScreenDimensions => {
  const {width, height} = Dimensions.get('window');
  return {width, height};
};
export const getErrorMessageByCode = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'User not found. Please check your email or sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many sign-in attempts. Please try again later.';
    case 'auth/invalid-email':
      return 'Invalid email address. Please check your email format.';
    case 'auth/network-request-failed':
      return 'Network request failed. Please check your internet connection.';
    case 'auth/weak-password':
      return 'Weak password. Password should be stronger.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/operation-not-allowed':
      return 'Email and password sign-in is not allowed for this app.';
    case 'auth/missing-verification-code':
      return 'Email verification is required. Please check your email for a verification link.';
    case 'auth/invalid-verification-code':
      return 'Invalid email verification code. Please check the code.';
    case 'auth/email-already-in-use':
      return 'Email address is already in use. Please use a different email.';
    default:
      return 'An unknown error occurred. Please try again.';
  }
};

export async function getUID() {
  try {
    const item = await StorageService.getItem<string | null>('uid');
    if (typeof item === 'string') {
      return item;
    }
  } catch (error) {
    console.error('Error getting UID:', error);
    return '';
  }
}
