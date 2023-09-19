import {NetworkResponse, UserInterface} from '@/interfaces';
import FirebaseService from '@/services/Firebase';
import {formatFirebaseTimestamp} from '@/utils';

const UID = 'ucCUjQtHVnZ8lblVtFHqAYMigot1';

const NetworkService = {
  async getAllConnections() {
    try {
      const response = await FirebaseService.getAllDocuments(
        `users/${UID}/connections`,
      );

      const result: NetworkResponse[] = await Promise.all(
        response.map(async item => {
          const connection = (await FirebaseService.getDocument(
            'users',
            item.id,
          )) as UserInterface;

          return {
            ...connection,
            time: formatFirebaseTimestamp(item.time, 'date'),
          };
        }),
      );

      return result;
    } catch (error) {
      console.error('Error fetching connections:', error);
      throw error;
    }
  },
  async getAllFollowers() {
    try {
      const response = await FirebaseService.getAllDocuments(
        `users/${UID}/followers`,
      );

      const result: NetworkResponse[] = await Promise.all(
        response.map(async item => {
          const follower = (await FirebaseService.getDocument(
            'users',
            item.id,
          )) as UserInterface;

          return {
            ...follower,
            time: formatFirebaseTimestamp(item.time, 'date'),
          };
        }),
      );

      return result;
    } catch (error) {
      console.error('Error fetching followers:', error);
      throw error;
    }
  },

  async getAllFollowings() {
    try {
      const response = await FirebaseService.getAllDocuments(
        `users/${UID}/following`,
      );

      const result: NetworkResponse[] = await Promise.all(
        response.map(async item => {
          const following = (await FirebaseService.getDocument(
            'users',
            item.id,
          )) as UserInterface;

          return {
            ...following,
            time: formatFirebaseTimestamp(item.time, 'date'),
          };
        }),
      );

      return result;
    } catch (error) {
      console.error('Error fetching followings:', error);
      throw error;
    }
  },
};

export default NetworkService;
