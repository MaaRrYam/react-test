import FirebaseService from '@/services/Firebase';
import {auth} from '@/config/firebase';
import {UserCredential} from 'firebase/auth';
import {SigninServiceProps, UserInterface} from '@/interfaces';
import {Alert} from 'react-native';
import StorageService from '@/services/Storage';

const SigninService: SigninServiceProps = {
  async checkIfUserIsWhitelisted(
    loggedInUser: UserCredential,
    navigation: any,
  ) {
    const user = loggedInUser.user;
    const email = user.email?.toString();
    const photoUrl = user.photoURL?.toString() || ''; // Set photoUrl to null if undefined

    try {
      const whiteListedUsers = await FirebaseService.getDocumentsByQuery(
        'whitelist',
        'email',
        '==',
        email,
      );

      if (whiteListedUsers.length === 0) {
        await auth.signOut();
        Alert.alert(
          'Please submit an access request to start using the platform.',
        );
        navigation.navigate('RequestAccess');
      } else if (whiteListedUsers[0].whitelisted === false) {
        await auth.signOut();
        Alert.alert('Your access request is still pending approval.');
      } else {
        const loggedInUserId: string = user.uid;
        const userData = await FirebaseService.getDocument(
          'users',
          loggedInUserId,
        );

        if (!userData) {
          const userDetails: UserInterface = {
            name: user.displayName!,
            id: user.uid!,
            email: email!,
            photoUrl: photoUrl, // Assign the photoUrl here
            onboarded: false,
            currentCVC: 0,
            totalEarnedCVC: 0,
            selectedRole: whiteListedUsers[0].selectedRole,
            time: FirebaseService.serverTimestamp(),
          };
          await FirebaseService.addDocument('users', userDetails);
        }
        await StorageService.setItem<string>('uid', user.uid.toString());
        Alert.alert('Successfully signed in');
        navigation.navigate(userData?.onboarded ? 'MyTabs' : 'Onboarding');
      }
    } catch (error) {
      throw error;
    }
  },
};

export default SigninService;
