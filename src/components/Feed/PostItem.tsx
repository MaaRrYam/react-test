import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {FeedItemProps} from '@/interfaces';
import {styles} from '@/screens/home/styles';
import {Comment, Dislike, Like, Report, Share} from '@/assets/icons';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import HomeService from '@/services/home';
import {
  addDislike,
  addDislikeAndRemoveLike,
  addLike,
  addLikeAndRemoveDislike,
  removeDisLike,
  removeLike,
} from '@/store/features/homeSlice';
import FirebaseService from '@/services/Firebase';
import ToastService from '@/services/toast';
import {getUID} from '@/utils/functions';

const PostItem = ({item, fetchPostComments}: FeedItemProps) => {
  const dispatch = useAppDispatch();
  const [reactions, setReactions] = useState({
    like: false,
    dislike: false,
  });

  const isPostLikedByUser = async () => {
    const UID = await getUID();
    const response =
      item.postLikes?.some(like => like.likedBy === UID) || false;

    setReactions(prev => ({...prev, like: response}));
  };

  const isPostDisLikedByUser = async () => {
    const UID = await getUID();
    const response =
      item.postDislikes?.some(like => like.likedBy === UID) || false;
    setReactions(prev => ({...prev, dislike: response}));
  };

  const likeAPost = async () => {
    const UID = (await getUID()) as string;
    if (reactions.like) {
      dispatch(
        removeLike({
          id: item.id,
          reaction: {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        }),
      );
      setReactions(prev => ({...prev, like: false}));
      const response = await HomeService.removeLike(item.id, UID);
      if (response) {
        ToastService.showSuccess('Post Like Removed');
      }

      return;
    } else if (reactions.dislike) {
      dispatch(
        addLikeAndRemoveDislike({
          id: item.id,
          reaction: {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        }),
      );
      setReactions({like: true, dislike: false});
      const response = await HomeService.removeDisLikeAndLike(item.id, UID);
      if (response) {
        ToastService.showSuccess('Post Disliked');
      }
      return;
    } else {
      dispatch(
        addLike({
          id: item.id,
          reaction: {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        }),
      );
      setReactions(prev => ({...prev, like: true}));
      const response = await HomeService.likeAPost(item.id, UID);
      if (response) {
        ToastService.showSuccess('Post liked');
      }
    }
  };

  const disLikeAPost = async () => {
    const UID = (await getUID()) as string;

    if (reactions.dislike) {
      dispatch(
        removeDisLike({
          id: item.id,
          reaction: {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        }),
      );
      setReactions(prev => ({...prev, dislike: false}));
      const response = await HomeService.removeDislike(item.id, UID);
      if (response) {
        ToastService.showSuccess('Post Dislike Removed');
      }
      return;
    } else if (reactions.like) {
      dispatch(
        addDislikeAndRemoveLike({
          id: item.id,
          reaction: {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        }),
      );
      setReactions({like: false, dislike: true});
      const response = await HomeService.removeLikeAndDisLike(item.id, UID);
      if (response) {
        ToastService.showSuccess('Post Liked');
      }
      return;
    } else {
      dispatch(
        addDislike({
          id: item.id,
          reaction: {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        }),
      );

      setReactions(prev => ({...prev, dislike: true}));
      const response = await HomeService.disLikeAPost(item.id, UID);
      if (response) {
        ToastService.showSuccess('Post Disliked');
      }
    }
  };

  useEffect(() => {
    isPostDisLikedByUser();
    isPostLikedByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Text style={styles.feedContent}>{item.text}</Text>
      {item.media && <Image source={{uri: item.media}} style={styles.media} />}
      <View style={styles.postReactions}>
        <TouchableOpacity style={styles.reactionButton} onPress={likeAPost}>
          <Like isLiked={reactions.like} />
        </TouchableOpacity>
        <Text style={styles.like}>
          {/* {item?.postLikes!.length - item?.postDislikes!.length} */}
          0
        </Text>
        <TouchableOpacity style={styles.reactionButton} onPress={disLikeAPost}>
          <Dislike isLiked={reactions.dislike} />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => fetchPostComments(item.id)}>
            <Comment />
          </TouchableOpacity>
          <TouchableOpacity>
            <Share />
          </TouchableOpacity>
          <TouchableOpacity>
            <Report />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default PostItem;
