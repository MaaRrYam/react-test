import {useEffect, useState} from 'react';
import FirebaseService from '@/services/Firebase'; // Import your FirebaseService
import {UserInterface} from '@/interfaces'; // Import the UserInterface from '@/interfaces'
import {getUID} from '@/utils/functions'; // Import the getUID function
import {DocumentData} from 'firebase/firestore'; // Import DocumentData type from Firebase

export const useUserDoc = (): UserInterface => {
  const [user, setUser] = useState<UserInterface>({} as UserInterface);

  useEffect(() => {
    const fetchUIDAndListen = async () => {
      try {
        const UID = await getUID(); // Fetch the document ID asynchronously
        const collectionName = 'users';

        // Use the listenToDocument function to listen to the user document
        FirebaseService.listenToDocument(
          collectionName,
          UID as string,
          (document: DocumentData | null) => {
            if (document) {
              // Handle the updated document data here
              setUser(document as UserInterface);
            } else {
              // Handle the case where the document no longer exists
              setUser({} as UserInterface); // Return an empty user object
            }
          },
        );
      } catch (error) {
        console.error('Error fetching UID or listening to document:', error);
      }
    };

    fetchUIDAndListen();
  }, []);

  return user;
};
