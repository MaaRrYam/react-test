import Cache from '@/cache';
import {UserInterface} from '@/interfaces';
import FirebaseService from '../Firebase';

const PostService = {
  async getAuthor(authorId: string) {
    let author = {} as UserInterface;
    if (await Cache.get(`user_${authorId}`)) {
      author = (await Cache.get(`user_${authorId}`)) as UserInterface;
    } else {
      author = (await FirebaseService.getDocument(
        'users',
        authorId,
      )) as UserInterface;
      await Cache.set(`user_${authorId}`, author);
    }
    return author;
  },
};

export default PostService;
