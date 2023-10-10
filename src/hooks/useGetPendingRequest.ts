import {useEffect, useState} from 'react';
import FirebaseService from '@/services/Firebase'; // Import your FirebaseService
import {getUID} from '@/utils/functions';
import {DocumentData} from 'firebase/firestore';

const useGetPendingRequest = (uid: string) => {
  const [pendingRequests, setConnections] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uidToUse = uid || (await getUID());

        if (uidToUse) {
          const collectionName = `users/${uidToUse}/pendingRequests`;
          const unsubscribe = await FirebaseService.listenToAllDocuments(
            collectionName,
            documents => {
              if (documents && documents.length > 0) {
                setConnections(documents);
              } else {
                setConnections([]);
              }
            },
          );
          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Error retrieving UID or documents:', error);
      }
    };

    fetchData();
  }, [uid]);

  return pendingRequests;
};
export default useGetPendingRequest;
