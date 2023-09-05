import {initializeApp} from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAf_Xcn2TFArNeKBiVzmBfDdowWuWuuIxQ',
  authDomain: 'careernetwork-49577.firebaseapp.com',
  projectId: 'careernetwork-49577',
  storageBucket: 'careernetwork-49577.appspot.com',
  messagingSenderId: '644352516404',
  appId: '1:644352516404:web:4b646593633c3d6adcc561',
};

const app = initializeApp(firebaseConfig);

export default app;
