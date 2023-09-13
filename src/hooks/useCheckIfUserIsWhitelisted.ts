import {getAuth, UserCredential} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import {ToastAndroid} from 'react-native';
import {UserInterface} from '@/interfaces';

const checkIfUserIsWhitelisted = async (
  loggedInUser: UserCredential,
  navigation: any,
): Promise<void> => {
  const db = getFirestore();
  const auth = getAuth();
  try {
    const user = loggedInUser.user;
    const newDocRef = doc(db, 'users', user.uid);
    const whiteRef = collection(db, 'whitelist');
    const q = query(whiteRef, where('email', '==', user.email?.toString()));
    const docSnapshot = await getDocs(q);

    if (
      docSnapshot.docs.length > 0 &&
      docSnapshot.docs[0].data().whitelisted === true
    ) {
      let userWhiteListDoc = docSnapshot.docs[0].data();
      let loggedInUserId: string = user.uid;
      const userRef = doc(db, 'users', loggedInUserId);
      const userDataSnapshot = await getDoc(userRef);
      const userDataExists = userDataSnapshot.exists;

      if (!userDataExists) {
        let userDetails: UserInterface = {
          name: user.displayName!,
          id: user.uid!,
          email: user.email!,
          photoUrl: user.photoURL?.toString(),
          onboarded: false,
          currentCVC: 0,
          totalEarnedCVC: 0,
          selectedRole: userWhiteListDoc.selectedRole,
          time: Timestamp.now(),
        };

        await setDoc(newDocRef, userDetails, {merge: true});
      }
      ToastAndroid.show('Successfully signed in', ToastAndroid.SHORT);
      navigation.navigate('Home'); // Replace 'Home' with the appropriate screen name
    } else if (docSnapshot.docs.length === 0) {
      await auth.signOut();
      ToastAndroid.show(
        'Please submit an access request to start using the platform.',
        ToastAndroid.LONG,
      );
    } else if (
      docSnapshot.docs.length > 0 &&
      docSnapshot.docs[0].data().whitelisted === false
    ) {
      await auth.signOut();
      ToastAndroid.show(
        'Your access request is still pending approval.',
        ToastAndroid.LONG,
      );
      navigation.navigate('GetStarted');
    } else {
      await auth.signOut();
      ToastAndroid.show('An unknown error occurred code:64', ToastAndroid.LONG);
    }
  } catch (error) {
    throw error;
  }
};

export default checkIfUserIsWhitelisted;
