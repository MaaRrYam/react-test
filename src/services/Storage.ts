import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageServiceProps} from '@/interfaces';

interface StorageError extends Error {
  code?: string;
}

const StorageService: StorageServiceProps = {
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error: any) {
      const storageError: StorageError = new Error(
        `AsyncStorage setItem error: ${error.message}`,
      );
      storageError.code = error.code;
      throw storageError;
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch (error: any) {
      const storageError: StorageError = new Error(
        `AsyncStorage getItem error: ${error.message}`,
      );
      storageError.code = error.code;
      throw storageError;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error: any) {
      const storageError: StorageError = new Error(
        `AsyncStorage removeItem error: ${error.message}`,
      );
      storageError.code = error.code;
      throw storageError;
    }
  },

  async nuke(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error: any) {
      const storageError: StorageError = new Error(
        `AsyncStorage nuke error: ${error.message}`,
      );
      storageError.code = error.code;
      throw storageError;
    }
  },
};

export default StorageService;
