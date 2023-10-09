import {useEffect, useState} from 'react';
import FirebaseService from '@/services/Firebase'; // Import your FirebaseService
import {getUID} from '@/utils/functions';
import { DocumentData } from 'firebase/firestore';

const useConnections = (uid: string) => {
  const [connections, setConnections] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uidToUse = uid || (await getUID());

        if (uidToUse) {
          const collectionName = `users/${uidToUse}/connections`;
          const documents = await FirebaseService.getAllDocuments(
            collectionName,
          );

          if (documents && documents.length > 0) {
            setConnections(documents);
          } else {
            setConnections([]);
          }
        } else {
          setConnections([]);
        }
      } catch (error) {
        console.error('Error retrieving UID or documents:', error);
      }
    };

    fetchData();
  }, [uid]);

  return connections;
};

export default useConnections;
