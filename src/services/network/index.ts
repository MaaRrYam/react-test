import {API_GET} from '@/config/api/apiRequests';
import {NetworkResponse, UserInterface} from '@/interfaces';
import FirebaseService from '@/services/Firebase';
import {getUID} from '@/utils/functions';
import Cache from '@/cache';

let UID: string;
(async () => {
  UID = (await getUID()) as string;
})();

const NetworkService = {
  async getAllConnections(id = UID) {
    try {
      const response = await FirebaseService.getAllDocuments(
        `users/${id}/connections`,
      );

      const result: NetworkResponse[] = await Promise.all(
        response.map(async item => {
          let connection = {} as UserInterface;

          if (await Cache.get(`user_${item.senderId}`)) {
            connection = (await Cache.get(`user_${item.id}`)) as UserInterface;
          } else {
            connection = (await FirebaseService.getDocument(
              'users',
              item.id,
            )) as UserInterface;
            await Cache.set(`user_${item.id}`, connection);
          }

          return {
            ...connection,
            requestTime: item.time,
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
          let follower = {} as UserInterface;

          if (await Cache.get(`user_${item.senderId}`)) {
            follower = (await Cache.get(`user_${item.id}`)) as UserInterface;
          } else {
            follower = (await FirebaseService.getDocument(
              'users',
              item.id,
            )) as UserInterface;
            await Cache.set(`user_${item.id}`, follower);
          }

          return {
            ...follower,
            requestTime: item.time,
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
          let following = {} as UserInterface;

          if (await Cache.get(`user_${item.senderId}`)) {
            following = (await Cache.get(`user_${item.id}`)) as UserInterface;
          } else {
            following = (await FirebaseService.getDocument(
              'users',
              item.id,
            )) as UserInterface;
            await Cache.set(`user_${item.id}`, following);
          }

          return {
            ...following,
            requestTime: item.time,
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
  async getPendingConnectionRequests(id: string = UID) {
    const response = await FirebaseService.getAllDocuments(
      `users/${id}/requests`,
    );

    const result: NetworkResponse[] = await Promise.all(
      response.map(async item => {
        let request = {} as UserInterface;

        if (await Cache.get(`user_${item.senderId}`)) {
          request = (await Cache.get(`user_${item.id}`)) as UserInterface;
        } else {
          request = (await FirebaseService.getDocument(
            'users',
            item.id,
          )) as UserInterface;
          await Cache.set(`user_${item.id}`, request);
        }

        return {
          ...request,
          requestTime: item.time,
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
      const payload = {
        id: UID,
        time: FirebaseService.serverTimestamp(),
      };
      await Promise.all([
        FirebaseService.setDoc(`users/${userId}/requests`, UID, payload),
        FirebaseService.setDoc(`users/${UID}/pendingRequests`, userId, payload),
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async removeConnectionRequest(userId: string) {
    try {
      await FirebaseService.deleteDocument(`users/${userId}/requests`, UID);

      return true;
    } catch (error) {
      console.error('Error accepting connection:', error);
      return false;
    }
  },
  async getPendingRequests(userId: string = UID) {
    try {
      const response = await FirebaseService.getAllDocuments(
        `users/${userId}/pendingRequests`,
      );

      const result: NetworkResponse[] = await Promise.all(
        response.map(async item => {
          let request = {} as UserInterface;

          if (await Cache.get(`user_${item.senderId}`)) {
            request = (await Cache.get(`user_${item.id}`)) as UserInterface;
          } else {
            request = (await FirebaseService.getDocument(
              'users',
              item.id,
            )) as UserInterface;
            await Cache.set(`user_${item.id}`, request);
          }

          return {
            ...request,
            requestTime: item.time,
          };
        }),
      );

      return result;
    } catch (error) {
      console.log(error);
      return [] as NetworkResponse[];
    }
  },
};

export default NetworkService;
