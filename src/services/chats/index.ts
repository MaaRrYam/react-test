import {ChatsInterface, UserInterface} from '@/interfaces';
import FirebaseService from '@/services/Firebase';
import {formatFirebaseTimestamp} from '@/utils';
import {getUID} from '@/utils/functions';
import {Timestamp} from 'firebase/firestore';

let UID: string;
(async () => {
  const storageResult = await getUID();
  if (storageResult) {
    UID = storageResult;
  }
})();

const ChatsService = {
  async getAllChats() {
    try {
      const response = (await FirebaseService.getAllDocuments(
        `users/${UID}/chats`,
      )) as ChatsInterface[];

      const result: ChatsInterface[] = await Promise.all(
        response.map(async item => {
          const author = (await FirebaseService.getDocument(
            'users',
            item.userId,
          )) as UserInterface;

          return {
            ...item,
            user: author,
            time: formatFirebaseTimestamp(item.time as Timestamp, 'time'),
          };
        }),
      );

      const sortedChats = result.sort(function (a, b) {
        return ('' + a.time).localeCompare(b.time as string);
      });
      return sortedChats;
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  },
};

export default ChatsService;
