import StorageService from '@/services/Storage';
import FirebaseService from '@/services/Firebase';

import {CACHE_EXPIRATION_TIME} from '@/constants';
import {UserInterface, FeedItem} from '@/interfaces';

class Cache {
  async getUser(uid: string): Promise<UserInterface | null> {
    try {
      const cachedUserData = await this.getCachedData(
        Cache.getUserCacheKey(uid),
      );

      if (cachedUserData && this.isCacheValid(cachedUserData.timestamp)) {
        return cachedUserData.data as UserInterface;
      }

      const user = (await FirebaseService.getDocument(
        'users',
        uid,
      )) as UserInterface;
      this.updateCache(Cache.getUserCacheKey(uid), user);

      return user;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  async setFeed(feed: FeedItem[]): Promise<void> {
    const feedCacheKey = Cache.getFeedCacheKey();
    await this.updateCache(feedCacheKey, feed);
  }

  async getFeed(): Promise<FeedItem[] | null> {
    try {
      const cachedFeedData = await this.getCachedData(Cache.getFeedCacheKey());

      if (cachedFeedData) {
        return cachedFeedData.data as FeedItem[];
      }

      return null;
    } catch (error) {
      console.error('Error fetching feed data:', error);
      throw error;
    }
  }

  private static getUserCacheKey(uid: string): string {
    return `user_${uid}`;
  }

  private static getFeedCacheKey(): string {
    return 'feed';
  }

  private async getCachedData(cacheKey: string): Promise<any | null> {
    try {
      const cachedData = (await StorageService.getItem(cacheKey)) as any;
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      return null;
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  }

  private isCacheValid(timestamp: number): boolean {
    const currentTime = new Date().getTime();
    return currentTime - timestamp < CACHE_EXPIRATION_TIME;
  }

  private async updateCache(cacheKey: string, data: any): Promise<void> {
    const cacheItem = {data, timestamp: new Date().getTime()};
    await StorageService.setItem(cacheKey, cacheItem);
  }
}

const cache = new Cache();

export const getUser = cache.getUser.bind(cache);
export const setFeed = cache.setFeed.bind(cache);
export const getFeed = cache.getFeed.bind(cache);
