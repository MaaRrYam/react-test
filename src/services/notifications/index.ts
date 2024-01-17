import {NotificationInterface, UserInterface} from '@/interfaces';
import FirebaseService from '@/services/Firebase';
import {formatFirebaseTimestamp} from '@/utils';
import {getUID} from '@/utils/functions';
import Cache from '@/cache';

let UID: string;
(async () => {
  UID = (await getUID()) as string;
})();
const NotificationService = {
  async getAllNotifications() {
    try {
      const response = await FirebaseService.getAllDocuments(
        `users/${UID}/notifications`,
        'timestamp',
        'desc',
      );

      const result: NotificationInterface[] = await Promise.all(
        response.map(async item => {
          const notification = (await FirebaseService.getDocument(
            `users/${UID}/notifications`,
            item.id,
          )) as NotificationInterface;

          let author = {} as UserInterface;

          if (await Cache.get(`user_${item.senderId}`)) {
            author = (await Cache.get(
              `user_${item.senderId}`,
            )) as UserInterface;
          } else {
            author = (await FirebaseService.getDocument(
              'users',
              item.senderId,
            )) as UserInterface;
            Cache.set(`user_${item.senderId}`, author);
          }

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
