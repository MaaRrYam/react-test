import {Platform} from 'react-native';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  Timestamp,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  onSnapshot,
  Unsubscribe,
  orderBy,
} from 'firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {Image} from 'react-native-compressor';

import {FirebaseServiceProps, Asset} from '@/interfaces';
import {makeFirebasePayloadAccessible, formatFirebaseTimestamp} from '@/utils';

const db = getFirestore();

const FirebaseService: FirebaseServiceProps = {
  async addDocument(collectionName, data) {
    try {
      const docRef: DocumentReference<DocumentData> = await addDoc(
        collection(db, collectionName),
        data,
      );
      return docRef.id;
    } catch (error) {
      console.error('Error adding document: ', error);
      throw error;
    }
  },
  async updateDocument(collectionName, documentId, data) {
    try {
      const updateDocRef = doc(db, collectionName, documentId);
      await updateDoc(updateDocRef, data);
    } catch (error) {
      console.error('Error adding document: ', error);
      throw error;
    }
  },
  async setDoc(collectionName, docId, payload) {
    try {
      const docRef = doc(db, collectionName, docId);

      await setDoc(docRef, payload, {merge: true});

      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error while setting document: ', error);
      throw error;
    }
  },
  async deleteDocument(collectionName, documentId) {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document: ', error);
      throw error;
    }
  },

  async getAllDocuments(collectionName, orderByField, orderByDirection) {
    try {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(
        orderByField
          ? query(collectionRef, orderBy(orderByField, orderByDirection))
          : collectionRef,
      );

      const documents: DocumentData[] = [];
      querySnapshot.forEach((document: QueryDocumentSnapshot<DocumentData>) => {
        const data = makeFirebasePayloadAccessible(document);

        documents.push(data);
      });
      return documents;
    } catch (error) {
      console.error('Error getting documents: ', error);
      throw error;
    }
  },

  async getDocument(collectionName, documentId) {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return makeFirebasePayloadAccessible(docSnapshot);
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        `Error getting document ${documentId} from ${collectionName}:`,
        error,
      );
      throw error;
    }
  },

  async getDocumentsByQuery(collectionName, field, operator, value) {
    try {
      const q = query(
        collection(db, collectionName),
        where(field, operator, value),
      );
      const querySnapshot = await getDocs(q);
      const documents: DocumentData[] = [];
      querySnapshot.forEach((document: QueryDocumentSnapshot<DocumentData>) => {
        const data = makeFirebasePayloadAccessible(document);
        documents.push(data);
      });
      return documents;
    } catch (error) {
      console.error('Error getting documents by query: ', error);
      throw error;
    }
  },

  async checkDuplicateRequest(
    collectionName: string,
    fieldName: string,
    value: any,
  ): Promise<boolean> {
    try {
      const colRef = collection(db, collectionName);
      const q = query(colRef, where(fieldName, '==', value));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.length > 0;
    } catch (error) {
      console.error(
        `Error checking for duplicate request in ${collectionName}:`,
        error,
      );
      throw error;
    }
  },

  async uploadToStorage(file: Asset) {
    try {
      const {uri} = file;

      if (uri) {
        const result = await Image.compress(uri, {
          compressionMethod: 'manual',
          maxWidth: 1000,
          quality: 0.6,
        });

        const filename = this.generateUniqueFilename();
        const uploadUri =
          Platform.OS === 'ios' ? result.replace('file://', '') : result;

        const task = storage().ref(filename).putFile(uploadUri);
        await task;

        const imageURL = await storage().ref(filename).getDownloadURL();
        console.log({imageURL});
        return imageURL;
      }
      return '';
    } catch (error) {
      console.error('Error uploading file to storage: ', error);
      throw error;
    }
  },

  generateUniqueFilename() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(7);
    return `${timestamp}_${randomString}`;
  },

  serverTimestamp() {
    return Timestamp.now();
  },

  generateUniqueId() {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';

    for (let i = 0; i < 20; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return autoId;
  },
  listenToDocument: (
    collectionName: string,
    documentId: string,
    callback: (document: DocumentData | null) => void,
  ): Unsubscribe => {
    const docRef = doc(db, collectionName, documentId);

    // Set up a listener to watch for changes to the document
    const unsubscribe = onSnapshot(docRef, docSnapshot => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        Object.keys(data).forEach(field => {
          if (
            data[field] &&
            typeof data[field] === 'object' &&
            'seconds' in data[field] &&
            'nanoseconds' in data[field]
          ) {
            data[field] = formatFirebaseTimestamp(data[field], 'date');
          }
        });

        const document = {id: docSnapshot.id, ...data};
        // Invoke the provided callback with the updated document
        callback(document);
      } else {
        // The document no longer exists
        callback(null);
      }
    });

    return unsubscribe;
  },
  listenToAllDocuments: async (
    collectionName: string,
    callback: (documents: DocumentData[]) => void,
  ): Promise<Unsubscribe> => {
    const colRef = collection(db, collectionName);

    // Set up a listener to watch for changes to the entire collection
    const unsubscribe = onSnapshot(colRef, async querySnapshot => {
      const documents: DocumentData[] = [];
      for (const docSnapshot of querySnapshot.docs) {
        const data = docSnapshot.data();

        Object.keys(data).forEach(field => {
          if (
            data[field] &&
            typeof data[field] === 'object' &&
            'seconds' in data[field] &&
            'nanoseconds' in data[field]
          ) {
            data[field] = formatFirebaseTimestamp(data[field], 'date');
          }
        });

        const document = {id: docSnapshot.id, ...data};
        documents.push(document);
      }

      // Invoke the provided callback with the updated list of documents
      callback(documents);
    });

    return unsubscribe;
  },
  async reAuthenticateUser(password: string) {
    const user = firebase.auth().currentUser;
    if (user) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email as string,
        password,
      );
      return user.reauthenticateWithCredential(credential);
    }
  },
};

export default FirebaseService;
