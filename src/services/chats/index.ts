import {
  Timestamp,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import {
  ChatMessageInterface,
  ChatsInterface,
  GroupedMessage,
  UserInterface,
} from '@/interfaces';
import FirebaseService from '@/services/Firebase';
import {formatFirebaseTimestamp} from '@/utils';
import {getUID} from '@/utils/functions';

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
  groupMessagesByDate(messages: ChatMessageInterface[]) {
    const groupedMessages: GroupedMessage[] = [];

    messages.forEach(message => {
      const messageDate = new Date(message.time.seconds * 1000);
      const formattedDate = `${messageDate.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })}`;

      const existingGroup = groupedMessages.find(
        group => group.date === formattedDate,
      );

      const formattedMessage = {
        message: message.message,
        sender: message.senderId,
        time: messageDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      if (existingGroup) {
        existingGroup.messages.unshift(formattedMessage);
      } else {
        groupedMessages.unshift({
          id: groupedMessages.length + 1,
          date: formattedDate,
          messages: [formattedMessage],
        });
      }
    });

    groupedMessages.forEach(group => {
      group.messages.sort((a, b) => {
        const timeA = new Date(`1970/01/01 ${a.time}`);
        const timeB = new Date(`1970/01/01 ${b.time}`);
        return timeB.getTime() - timeA.getTime();
      });
    });

    return groupedMessages;
  },
  findChatAddress(two: string, one: string) {
    const result = one.localeCompare(two);

    if (result === 1) {
      return one + two;
    } else {
      return two + one;
    }
  },
  async fetchMessagesRealTime(
    chatAddress: string,
    updateMessages: (messages: GroupedMessage[]) => void,
  ) {
    const db = getFirestore();

    const unsub = onSnapshot(
      query(
        collection(db, 'chats', chatAddress, 'messages'),
        orderBy('time', 'desc'),
        limit(100),
      ),
      chatDocs => {
        const fetchedMessages = chatDocs.docs.map(
          e => e.data() as ChatMessageInterface,
        );
        const grouped = this.groupMessagesByDate(fetchedMessages);
        updateMessages(grouped);
      },
    );

    return unsub;
  },
};

export default ChatsService;
