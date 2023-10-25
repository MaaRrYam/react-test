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
} from 'firebase/firestore';
import storage from '@react-native-firebase/storage';

import {FirebaseServiceProps, Asset} from '@/interfaces';
import {formatFirebaseTimestamp} from '@/utils';

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

      await setDoc(docRef, payload);

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

  async getAllDocuments(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents: DocumentData[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        documents.push({id: doc.id, ...doc.data()});
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
        return document;
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
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        documents.push({id: doc.id, ...doc.data()});
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
        const filename = this.generateUniqueFilename();
        const uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        const task = storage().ref(filename).putFile(uploadUri);
        await task;

        const imageURL = await storage().ref(filename).getDownloadURL();
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
};

export default FirebaseService;
