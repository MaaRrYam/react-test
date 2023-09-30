import StorageService from '@/services/Storage';
import FirebaseService from '@/services/Firebase';

import {USER_CACHE_KEY, CACHE_EXPIRATION_TIME} from '@/constants';
import {UserInterface} from '@/interfaces';

class Cache {
  async getUser(uid: string): Promise<any> {
    try {
      const cachedUserData = await this.getCachedUserData(uid);

      if (cachedUserData) {
        const {data, timestamp}: {data: UserInterface; timestamp: number} =
          cachedUserData;

        const currentTime = new Date().getTime();
        if (currentTime - timestamp < CACHE_EXPIRATION_TIME) {
          return data;
        }
      }

      const user = await FirebaseService.getDocument('users', uid);

      this.updateCache(uid, user);

      return user;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  private async getCachedUserData(uid: string): Promise<any | null> {
    try {
      const cachedUser: any = await StorageService.getItem(
        `${USER_CACHE_KEY}_${uid}`,
      );
      if (cachedUser) {
        return JSON.parse(cachedUser);
      }
      return null;
    } catch (error) {
      console.error('Error getting cached user data:', error);
      return null;
    }
  }

  private async updateCache(uid: string, data: any): Promise<void> {
    const userData = {data, timestamp: new Date().getTime()};
    await StorageService.setItem(`${USER_CACHE_KEY}_${uid}`, userData);
  }
}

const cache = new Cache();
export default {
  getUser: cache.getUser,
};
