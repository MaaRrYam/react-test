import {NotificationInterface, UserInterface} from '@/interfaces';
import FirebaseService from '@/services/Firebase';
import {formatFirebaseTimestamp} from '@/utils';
import {getUID} from '@/utils/functions';

let UID: string;
(async () => {
  UID = await getUID();
  console.log(UID);
})();
const NotificationService = {
  async getAllNotifications() {
    try {
      const response = await FirebaseService.getAllDocuments(
        `users/${UID}/notifications`,
      );

      const result: NotificationInterface[] = await Promise.all(
        response.map(async item => {
          const notification = (await FirebaseService.getDocument(
            `users/${UID}/notifications`,
            item.id,
          )) as NotificationInterface;

          const author = (await FirebaseService.getDocument(
            'users',
            item.senderId,
          )) as UserInterface;

          return {
            ...notification,
            timestamp: formatFirebaseTimestamp(
              notification.timestamp,
              'dateTime',
            ),
            sender: author,
          };
        }),
      );

      const sortedNotifications = result.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
      return sortedNotifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  },

  async markNotificationRead(notificationId: string) {
    try {
      console.log(notificationId);
    } catch (error) {
      console.log(error);
    }
  },
};

export default NotificationService;
