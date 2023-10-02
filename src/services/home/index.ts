import {API_GET} from '@/config/api/apiRequests';
import {
  FeedComment,
  FeedCommentsResponse,
  FeedItem,
  UserInterface,
} from '@/interfaces';
import FirebaseService from '../Firebase';
import Cache from '@/cache';

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
  async removeLike(postId: string, disLikedBy: string) {
    try {
      await FirebaseService.deleteDocument(`posts/${postId}/likes`, disLikedBy);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async disLikeAPost(postId: string, disLikedBy: string) {
    try {
      await FirebaseService.setDoc(`posts/${postId}/dislikes`, disLikedBy, {
        likedBy: disLikedBy,
        timestamp: FirebaseService.serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async removeDislike(postId: string, disLikedBy: string) {
    try {
      await FirebaseService.deleteDocument(
        `posts/${postId}/dislikes`,
        disLikedBy,
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async removeDisLikeAndLike(postId: string, likedBy: string) {
    try {
      await Promise.all([
        this.removeDislike(postId, likedBy),
        this.likeAPost(postId, likedBy),
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async removeLikeAndDisLike(postId: string, disLikedBy: string) {
    try {
      await Promise.all([
        this.disLikeAPost(postId, disLikedBy),
        this.removeLike(postId, disLikedBy),
      ]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async fetchPostComments(postId: string) {
    try {
      const response = (await FirebaseService.getAllDocuments(
        `posts/${postId}/comments`,
      )) as FeedCommentsResponse[];

      const result: FeedComment[] = await Promise.all(
        response.map(async item => {
          let user = {} as UserInterface;

          if (await Cache.get(`user_${item.userId}`)) {
            user = (await Cache.get(`user_${item.userId}`)) as UserInterface;
          } else {
            user = (await FirebaseService.getDocument(
              'users',
              item.userId,
            )) as UserInterface;
            await Cache.set(`user_${item.userId}`, user);
          }

          return {
            ...item,
            user,
          };
        }),
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

export default HomeService;
