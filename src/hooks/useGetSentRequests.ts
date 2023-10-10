import {useEffect, useState} from 'react';
import FirebaseService from '@/services/Firebase';
import {getUID} from '@/utils/functions';
import {DocumentData} from 'firebase/firestore';

const useGetSentRequests = (uid: string) => {
  const [sentRequests, setSentRequests] = useState<DocumentData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uidToUse = uid || (await getUID());

        if (uidToUse) {
          const collectionName = `users/${uidToUse}/requests`;
          const unsubscribe = await FirebaseService.listenToAllDocuments(
            collectionName,
            documents => {
              if (documents && documents.length > 0) {
                setSentRequests(documents);
              } else {
                setSentRequests([]);
              }
            },
          );
          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Error retrieving UID or documents:', error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [uid]);

  return sentRequests;
};

export default useGetSentRequests;
