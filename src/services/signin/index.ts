import {UserCredential} from 'firebase/auth';
import FirebaseService from '@/services/Firebase';
import {auth} from '@/config/firebase';
import {SigninServiceProps, whiteListedUser} from '@/interfaces';
import StorageService from '@/services/Storage';
import {SCREEN_NAMES} from '@/constants';
import ToastService from '@/services/toast';
import {SignInScreenProps} from '@/types';
const SigninService: SigninServiceProps = {
  async checkIfUserIsWhitelisted(
    loggedInUser: UserCredential,
    navigation: SignInScreenProps,
  ) {
    const user = loggedInUser.user;
    const email = user.email?.toString();
    const photoUrl = user.photoURL?.toString() || '';
    try {
      const whiteListedUsers = await FirebaseService.getDocumentsByQuery(
        'whitelist',
        'email',
        '==',
        email,
      );

      if (!whiteListedUsers.length) {
        await ToastService.showError(
          'Please submit an access request to start using the platform.',
        );
        navigation.navigate(SCREEN_NAMES.RequestAccess);
      } else if (!whiteListedUsers[0].whitelisted) {
        await auth.signOut();
        await ToastService.showError(
          'Your access request is still pending approval.',
        );
      } else {
        const userData = await FirebaseService.getDocumentsByQuery(
          'users',
          'email',
          '==',
          email,
        );
        console.log(userData[0].id);

        if (!userData.length) {
          const userDetails: whiteListedUser = {
            name: whiteListedUsers[0].name!,
            email: email!,
            photoUrl: photoUrl,
            onboarded: false,
            onboardingStep: 0,
            currentCVC: 0,
            totalEarnedCVC: 0,
            selectedRole: whiteListedUsers[0].selectedRole,
            time: FirebaseService.serverTimestamp(),
          };
          const newUserDocId = await FirebaseService.addDocument(
            'users',
            userDetails,
          );
          await StorageService.setItem<string>('uid', newUserDocId);
          await FirebaseService.updateDocument('users', newUserDocId, {
            id: newUserDocId,
          });
        } else {
          await StorageService.setItem<string>('uid', userData[0].id);
        }
        await StorageService.setItem<string>(
          'accessToken',
          (await user.getIdToken()).toString(),
        );
        await ToastService.showSuccess('Successfully signed in');
        navigation.navigate(
          userData?.onboarded
            ? SCREEN_NAMES.BottomNavigator
            : SCREEN_NAMES.Onboarding,
        );
      }
    } catch (error) {
      throw error;
    }
  },
};

export default SigninService;
