import FirebaseService from '@/services/Firebase';

const UID = 'ucCUjQtHVnZ8lblVtFHqAYMigot1';

const NetworkService = {
  async getAllConnections() {
    try {
      const response = await FirebaseService.getAllDocuments(
        `users/${UID}/connections`,
      );

      const result = await Promise.all(
        response.map(async item => {
          const connection = await FirebaseService.getDocument(
            'users',
            item.id,
          );

          return {
            ...connection,
            time: item.time,
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

      const result = await Promise.all(
        response.map(async item => {
          const follower = await FirebaseService.getDocument('users', item.id);

          return {
            ...follower,
            time: item.time,
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

      const result = await Promise.all(
        response.map(async item => {
          const following = await FirebaseService.getDocument('users', item.id);

          return {
            ...following,
            time: item.time,
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
