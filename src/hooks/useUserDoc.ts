import {useEffect, useState} from 'react';
import FirebaseService from '@/services/Firebase';
import {UserInterface} from '@/interfaces';
import {getUID} from '@/utils/functions';
import {DocumentData} from 'firebase/firestore';

export const useUserDoc = (UID?: string): UserInterface => {
  const [user, setUser] = useState<UserInterface>({} as UserInterface);

  useEffect(() => {
    const fetchUIDAndListen = async () => {
      try {
        const uid = UID || ((await getUID()) as string); // Use the provided UID or fetch it asynchronously
        const collectionName = 'users';

        FirebaseService.listenToDocument(
          collectionName,
          uid,
          (document: DocumentData | null) => {
            if (document) {
              setUser(document as UserInterface);
            } else {
              setUser({} as UserInterface);
            }
          },
        );
      } catch (error) {
        console.error('Error fetching UID or listening to document:', error);
      }
    };

    fetchUIDAndListen();
  }, [UID]);

  return user;
};
