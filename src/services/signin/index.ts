import {ToastAndroid} from 'react-native';
import FirebaseService from '@/services/Firebase'; // Import your Firebase service here
import {auth} from '@/config/firebase';
import {UserCredential} from 'firebase/auth';
import {SigninServiceProps, UserInterface} from '@/interfaces';

const SigninService: SigninServiceProps = {
  async checkIfUserIsWhitelisted(loggedInUser: UserCredential, navigation: any) {
    try {
      const user = loggedInUser.user;
      const whiteListedUsers = await FirebaseService.getDocumentsByQuery(
        'whitelist',
        'email',
        '==',
        user.email?.toString(),
      );

      if (
        whiteListedUsers.length > 0 &&
        whiteListedUsers[0].whitelisted === true
      ) {
        const loggedInUserId: string = user.uid;
        const userData = await FirebaseService.getDocument(
          'users',
          loggedInUserId,
        );

        if (!userData) {
          const userDetails: UserInterface = {
            name: user.displayName!,
            id: user.uid!,
            email: user.email!,
            photoUrl: user.photoURL?.toString(),
            onboarded: false,
            currentCVC: 0,
            totalEarnedCVC: 0,
            selectedRole: whiteListedUsers[0].selectedRole,
            time: FirebaseService.serverTimestamp(),
          };
          await FirebaseService.addDocument('users', userDetails);
          ToastAndroid.show('Successfully signed in', ToastAndroid.SHORT);
          navigation.navigate('GetStarted');
        } else {
          if (!userData.onboarded) {
            ToastAndroid.show('Successfully signed in', ToastAndroid.SHORT);
            navigation.navigate('Onboarding');
            console.log(userData.onboarded);
          } else {
            ToastAndroid.show('Successfully signed in', ToastAndroid.SHORT);
            navigation.navigate('MyTabs');
            console.log(userData.onboarded);
          }
        }
      } else if (whiteListedUsers.length === 0) {
        await auth.signOut();
        ToastAndroid.show(
          'Please submit an access request to start using the platform.',
          ToastAndroid.LONG,
        );
        navigation.navigate('RequestAccess');
      } else if (
        whiteListedUsers.length > 0 &&
        whiteListedUsers[0].whitelisted === false
      ) {
        await auth.signOut();
        ToastAndroid.show(
          'Your access request is still pending approval.',
          ToastAndroid.LONG,
        );
      } else {
        await auth.signOut();
        ToastAndroid.show(
          'An unknown error occurred code:64',
          ToastAndroid.LONG,
        );
      }
    } catch (error) {
      throw error;
    }
  },
};

export default SigninService;
