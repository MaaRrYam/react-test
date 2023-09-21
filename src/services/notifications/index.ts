import {NotificationInterface} from '@/interfaces';
import FirebaseService from '@/services/Firebase';

const UID = 'ucCUjQtHVnZ8lblVtFHqAYMigot1';

const NotificationService = {
  async getAllNotifications() {
    try {
      const response = await FirebaseService.getDocumentsByQuery(
        `users/${UID}/notifications`,
        'timestamp',
        '>',
        0,
      );

      const result: any = await Promise.all(
        response.map(async item => {
          const notification = (await FirebaseService.getDocument(
            `users/${UID}/notifications`,
            item.id,
          )) as NotificationInterface;

          return notification;
        }),
      );
      return result;
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
