import {CreatePostInterface} from './../../interfaces/index';
import {CancelTokenSource} from 'axios';
import {API_GET} from '@/config/api/apiRequests';
import {
  FeedCommentsResponse,
  FeedItem,
  ReplyCommentInterface,
} from '@/interfaces';
import FirebaseService from '@/services/Firebase';
import {getUID} from '@/utils/functions';

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
  cancelRequest(source: CancelTokenSource) {
    source.cancel('Request cancelled by user');
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
      const {data, status} = await API_GET(`/feed/${postId}/comments`);
      if (status) {
        return this.sortComments(data);
      } else {
        return [] as FeedCommentsResponse[];
      }
    } catch (error) {
      console.log(error);
      return [] as FeedCommentsResponse[];
    }
  },
  sortComments(comments: FeedCommentsResponse[]) {
    const sortedComments = comments
      .map((post: FeedCommentsResponse) => {
        const likes = post.likes ? post.likes.length : 0;
        const dislikes = post.dislikes ? post.dislikes.length : 0;
        const difference = likes - dislikes;

        return {
          ...post,
          difference,
        };
      })
      .sort((a: any, b: any) => b.difference - a.difference);
    return sortedComments;
  },
  async addComment(postId: string, payload: FeedCommentsResponse) {
    try {
      await FirebaseService.addDocument(`posts/${postId}/comments`, payload);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async addReply(
    postId: string,
    commentId: string,
    payload: ReplyCommentInterface,
  ) {
    try {
      await FirebaseService.addDocument(
        `posts/${postId}/comments/${commentId}/replies`,
        payload,
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async reportAPost(postId: string, postAuthorId: string) {
    const UID = await getUID();
    const data = {
      reportText: 'Post is inappropriate',
      reportedBy: UID,
      postId: postId,
      authorId: postAuthorId,
      timestamp: FirebaseService.serverTimestamp(),
    };
    try {
      await FirebaseService.addDocument('postReports', data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async sharePost(postId: string) {
    try {
      const data = {
        text: postId,
        type: 'shared',
        hashtag: 'shared',
        creationTime: FirebaseService.serverTimestamp(),
        authorId: await getUID(),
      };
      await FirebaseService.addDocument('posts', data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async likeComment(postId: string, commentId: string) {
    try {
      const UID = (await getUID()) as string;
      await FirebaseService.setDoc(
        `posts/${postId}/comments/${commentId}/likes`,
        UID,
        {
          likedBy: UID,
          timestamp: FirebaseService.serverTimestamp(),
        },
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async dislikeComment(postId: string, commentId: string) {
    try {
      const UID = (await getUID()) as string;
      await FirebaseService.setDoc(
        `posts/${postId}/comments/${commentId}/dislikes`,
        UID,
        {
          likedBy: UID,
          timestamp: FirebaseService.serverTimestamp(),
        },
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async removeLikeAndDislikeComment(postId: string, commentId: string) {
    try {
      const UID = (await getUID()) as string;
      await Promise.all([
        FirebaseService.setDoc(
          `posts/${postId}/comments/${commentId}/dislikes`,
          UID,
          {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        ),
        FirebaseService.deleteDocument(
          `posts/${postId}/comments/${commentId}/likes`,
          UID,
        ),
      ]);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async removeDislikeAndLikeComment(postId: string, commentId: string) {
    try {
      const UID = (await getUID()) as string;
      await Promise.all([
        FirebaseService.setDoc(
          `posts/${postId}/comments/${commentId}/likes`,
          UID,
          {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        ),
        FirebaseService.deleteDocument(
          `posts/${postId}/comments/${commentId}/dislikes`,
          UID,
        ),
      ]);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async removeLikeComment(postId: string, commentId: string) {
    try {
      const UID = (await getUID()) as string;
      await FirebaseService.deleteDocument(
        `posts/${postId}/comments/${commentId}/likes`,
        UID,
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async removeDislikeComment(postId: string, commentId: string) {
    try {
      const UID = (await getUID()) as string;
      await FirebaseService.deleteDocument(
        `posts/${postId}/comments/${commentId}/dislikes`,
        UID,
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async createPost(payload: CreatePostInterface) {
    try {
      await FirebaseService.setDoc('posts', payload.id, payload);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default HomeService;
