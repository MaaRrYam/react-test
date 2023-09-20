import {API_GET} from '@/config/api/apiRequests';
import {NetworkResponse, UserInterface} from '@/interfaces';
import FirebaseService from '@/services/Firebase';
import {formatFirebaseTimestamp} from '@/utils';
import StorageService from '@/services/Storage';

let UID: string;
StorageService.getItem('uid').then(item => {
  UID = item as string;
});

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
            requestTime: formatFirebaseTimestamp(item.time, 'date'),
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
            requestTime: formatFirebaseTimestamp(item.time, 'date'),
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
            requestTime: formatFirebaseTimestamp(item.time, 'date'),
          };
        }),
      );

      return result;
    } catch (error) {
      console.error('Error fetching followings:', error);
      throw error;
    }
  },
  async getRecommendedConnections() {
    try {
      const {status, message, data} = await API_GET('/recommendConnection');
      if (status) {
        return data as NetworkResponse[];
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error('Error fetching followers:', error);
      throw error;
    }
  },
  async acceptConnectionRequest(userId: string) {
    try {
      const addCurrentUserConnection = FirebaseService.addDocument(
        `users/${UID}/connections/${userId}`,
        {
          id: userId,
          time: FirebaseService.serverTimestamp(),
        },
      );
      const addTargetUserConnection = FirebaseService.addDocument(
        `users/${userId}/connections/${UID}`,
        {
          id: userId,
          time: FirebaseService.serverTimestamp(),
        },
      );
      const deleteRequest = FirebaseService.deleteDocument(
        `users/${UID}/requests`,
        userId,
      );

      await Promise.allSettled([
        addCurrentUserConnection,
        addTargetUserConnection,
        deleteRequest,
      ]);

      return true;
    } catch (error) {
      console.error('Error accepting connection:', error);
      return false;
    }
  },
  async rejectConnectionRequest(userId: string) {
    try {
      await FirebaseService.deleteDocument(`users/${UID}/requests`, userId);

      return true;
    } catch (error) {
      console.error('Error accepting connection:', error);
      return false;
    }
  },
  async removeConnection(userId: string) {
    try {
      const deleteCurrentUserConnection = FirebaseService.deleteDocument(
        `users/${UID}/connections`,
        userId,
      );
      const deleteTargetUserConnection = FirebaseService.deleteDocument(
        `users/${userId}/connections`,
        UID,
      );

      await Promise.allSettled([
        deleteCurrentUserConnection,
        deleteTargetUserConnection,
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getPendingConnectionRequests() {
    const response = await FirebaseService.getAllDocuments(
      `users/${UID}/requests`,
    );

    const result: NetworkResponse[] = await Promise.all(
      response.map(async item => {
        const request = (await FirebaseService.getDocument(
          'users',
          item.id,
        )) as UserInterface;

        return {
          ...request,
          requestTime: formatFirebaseTimestamp(item.time, 'date'),
        };
      }),
    );

    return result;
  },
  async removeFollowing(userId: string) {
    try {
      await FirebaseService.deleteDocument(`users/${UID}/following`, userId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async connectWithSomeone(userId: string) {
    try {
      await FirebaseService.addDocument(`users/${userId}/requests`, {
        id: UID,
        time: FirebaseService.serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default NetworkService;
