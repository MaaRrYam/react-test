import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Share} from 'react-native';

import {FeedItemProps} from '@/interfaces';
import {styles} from '@/screens/home/styles';
import {Comment, Dislike, Like, Report, ShareIcon} from '@/assets/icons';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import HomeService from '@/services/home';
import {
  addDislike,
  addDislikeAndRemoveLike,
  addLike,
  addLikeAndRemoveDislike,
  removeDisLike,
  removeLike,
  removeReportedPostFromFeed,
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

  const reportPost = async () => {
    const response = await HomeService.reportAPost(item._id, item.authorId);
    if (response) {
      dispatch(removeReportedPostFromFeed(item._id));
      ToastService.showSuccess('Post reported');
    }
  };

  const sharePost = async () => {
    // const response = await HomeService.sharePost(item._id);
    // if (response) {
    //   ToastService.showSuccess('Post shared');
    // }
    const {share, sharedAction, dismissedAction} = Share;

    const appUrl = 'cnmobile://post/' + item.id;
    const shareOptions = {
      title: 'Share a post',
      message: item.text || 'Check out this post',
      url: appUrl,
      ...(item.media && {imageUrl: item.media}),
    };

    try {
      const result = await share(shareOptions);
      if (result.action === sharedAction) {
        // ToastService.showSuccess('Post shared');
      } else if (result.action === dismissedAction) {
        // ToastService.showError('Post sharing dismissed');
      }
    } catch (error) {
      ToastService.showError('Error sharing post');
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
          {item?.postLikes!.length - item?.postDislikes!.length}
        </Text>
        <TouchableOpacity style={styles.reactionButton} onPress={disLikeAPost}>
          <Dislike isLiked={reactions.dislike} />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => fetchPostComments(item.id)}>
            <Comment />
          </TouchableOpacity>
          <TouchableOpacity onPress={sharePost}>
            <ShareIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={reportPost}>
            <Report />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default PostItem;
