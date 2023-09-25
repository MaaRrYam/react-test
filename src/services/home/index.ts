import {API_GET} from '@/config/api/apiRequests';
import {FeedItem} from '@/interfaces';

const HomeService = {
  async getFeed() {
    try {
      const {status, message, data} = await API_GET('/feed/v2');
      if (status) {
        return data as FeedItem[];
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error('Error fetching followers:', error);
      throw error;
    }
  },
};

export default HomeService;
