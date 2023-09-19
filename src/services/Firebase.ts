import {FirebaseServiceProps} from '@/interfaces';
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
  updateDoc,
} from 'firebase/firestore';

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
        return docSnapshot.data();
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
};

export default FirebaseService;
