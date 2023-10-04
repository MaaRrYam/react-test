import StorageService from '@/services/Storage';
import {CACHE_EXPIRATION_TIME} from '@/constants';
import {CacheServiceInterface, CacheItem} from '@/interfaces';

const Cache: CacheServiceInterface = {
  async set<T>(key: string, data: T): Promise<void> {
    try {
      const cacheItem: CacheItem<T> = {
        data,
        timestamp: new Date().getTime(),
      };
      await StorageService.setItem(key, cacheItem);
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  },

  async get<T>(key: string): Promise<T | null> {
    try {
      const cachedData = await StorageService.getItem<CacheItem<T>>(key);

      if (cachedData && this.isCacheValid(cachedData.timestamp)) {
        return cachedData.data;
      }

      return null;
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  },

  isCacheValid(timestamp: number): boolean {
    const currentTime = new Date().getTime();
    return currentTime - timestamp < CACHE_EXPIRATION_TIME;
  },
};

export default Cache;
