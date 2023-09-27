import {API_GET} from '@/config/api/apiRequests';
import {FeedItem} from '@/interfaces';
import FirebaseService from '../Firebase';

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
  async likeAPost(postId: string, likedBy: string) {
    try {
      const likePath = `posts/${postId}/likes`;

      const likeData = {
        likedBy,
        timestamp: FirebaseService.serverTimestamp(),
      };

      await FirebaseService.setDoc(likePath, likedBy, likeData);

      return true;
    } catch (error) {
      console.error('Error liking the post:', error);
      return false;
    }
  },
  async disLikeAPost(postId: string, disLikedBy: string) {
    try {
      await FirebaseService.setDoc(`posts/${postId}/likes`, disLikedBy, {
        likedBy: disLikedBy,
        timestamp: FirebaseService.serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async removeDisLikeAndLike(postId: string, likedBy: string) {
    try {
      await FirebaseService.deleteDocument(`posts/${postId}/likes`, likedBy);
      await this.likeAPost(postId, likedBy);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async removeLikeAndDisLike(postId: string, disLikedBy: string) {
    try {
      await FirebaseService.deleteDocument(`posts/${postId}/likes`, disLikedBy);
      await this.disLikeAPost(postId, disLikedBy);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default HomeService;
