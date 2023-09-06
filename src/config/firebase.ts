import {initializeApp} from 'firebase/app';
import 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAf_Xcn2TFArNeKBiVzmBfDdowWuWuuIxQ',
  authDomain: 'careernetwork-49577.firebaseapp.com',
  projectId: 'careernetwork-49577',
  storageBucket: 'careernetwork-49577.appspot.com',
  messagingSenderId: '644352516404',
  appId: '1:644352516404:web:4b646593633c3d6adcc561',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
