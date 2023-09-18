import FirebaseService from '@/services/Firebase'; // Import your Firebase service here
import {auth} from '@/config/firebase';
import {UserCredential} from 'firebase/auth';
import {SigninServiceProps, UserInterface} from '@/interfaces';
import {Alert} from 'react-native';
const SigninService: SigninServiceProps = {
  async checkIfUserIsWhitelisted(
    loggedInUser: UserCredential,
    navigation: any,
  ) {
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
          Alert.alert('Successfully signed in');
          navigation.navigate('GetStarted');
        } else {
          if (!userData.onboarded) {
            Alert.alert('Successfully signed in');
            navigation.navigate('Onboarding');
            console.log(userData.onboarded);
          } else {
            Alert.alert('Successfully signed in');
            navigation.navigate('MyTabs');
            console.log(userData.onboarded);
          }
        }
      } else if (whiteListedUsers.length === 0) {
        await auth.signOut();
        Alert.alert(
          'Please submit an access request to start using the platform.',
        );
        navigation.navigate('RequestAccess');
      } else if (
        whiteListedUsers.length > 0 &&
        whiteListedUsers[0].whitelisted === false
      ) {
        await auth.signOut();
        Alert.alert('Your access request is still pending approval.');
      } else {
        await auth.signOut();
        Alert.alert('An unknown error occurred code:64');
      }
    } catch (error) {
      throw error;
    }
  },
  async checkIfEmailUserIsWhitelisted(
    loggedInUser: UserCredential,
    navigation: any,
  ) {
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
            onboarded: false,
            currentCVC: 0,
            totalEarnedCVC: 0,
            selectedRole: whiteListedUsers[0].selectedRole,
            time: FirebaseService.serverTimestamp(),
          };
          await FirebaseService.addDocument('users', userDetails);
          Alert.alert('Successfully signed in');
          navigation.navigate('GetStarted');
        } else {
          if (!userData.onboarded) {
            Alert.alert('Successfully signed in');
            navigation.navigate('Onboarding');
            console.log(userData.onboarded);
          } else {
            Alert.alert('Successfully signed in');
            navigation.navigate('MyTabs');
            console.log(userData.onboarded);
          }
        }
      } else if (whiteListedUsers.length === 0) {
        await auth.signOut();
        Alert.alert(
          'Please submit an access request to start using the platform.',
        );
        navigation.navigate('RequestAccess');
      } else if (
        whiteListedUsers.length > 0 &&
        whiteListedUsers[0].whitelisted === false
      ) {
        await auth.signOut();
        Alert.alert('Your access request is still pending approval.');
      } else {
        await auth.signOut();
        Alert.alert('An unknown error occurred code:64');
      }
    } catch (error) {
      throw error;
    }
  },
};

export default SigninService;
