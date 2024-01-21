import React, {useState, useEffect, FC} from 'react';
import {View, Text, TouchableOpacity, Share} from 'react-native';
import FastImage from 'react-native-fast-image';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  Part,
  PartType,
  parseValue,
  isMentionPartType,
} from 'react-native-controlled-mentions';

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
import {RootStackParamList} from '@/types';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {youtubeIdFromUrl} from '@/utils';

const renderPart = (
  part: Part,
  index: number,
  handlePress: (id: string) => void,
) => {
  if (!part.partType) {
    return <Text key={index}>{part.text}</Text>;
  }

  if (isMentionPartType(part.partType)) {
    return (
      <Text
        key={`${index}-${part.data?.trigger}`}
        style={part.partType.textStyle}
        onPress={() => handlePress(part.data?.id || '')}>
        {part.text.slice(1)}
      </Text>
    );
  }

  return (
    <Text key={`${index}-pattern`} style={part.partType.textStyle}>
      {part.text}
    </Text>
  );
};

const RenderValue: FC<{
  value: string;
  partTypes: PartType[];
  handlePress: (id: string) => void;
}> = ({value, partTypes, handlePress}) => {
  const {parts} = parseValue(value, partTypes);

  return (
    <Text>
      {parts.map((part, index) => renderPart(part, index, handlePress))}
    </Text>
  );
};

const PostItem = ({item, fetchPostComments}: FeedItemProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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

    // const appUrl = 'cnmobile://post/' + item.id;
    const shareOptions = {
      message: `Check out this Post at CareerNetwork.co \n\n ${`https://careernetwork.co/post/${item._id}`}`,
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

  let isMediaExists: boolean = false;
  if (typeof item.media === 'object') {
    isMediaExists = item.media.url !== '';
  }
  if (typeof item.media === 'string') {
    isMediaExists = item.media !== '';
  }

  const handlePress = (id: string) => {
    navigation.navigate('Profile', {
      uid: id,
    });
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Post', {
          id: item.id,
          item,
        })
      }>
      <RenderValue
        value={item.text!}
        partTypes={[
          {
            textStyle: {color: 'blue'},
            trigger: '@',
          },
        ]}
        handlePress={handlePress}
      />
      {isMediaExists && (
        <>
          {item.mediaType === 'video' ? (
            <>
              {typeof item.media === 'string' && (
                <YoutubePlayer
                  height={230}
                  videoId={youtubeIdFromUrl(item.media)}
                />
              )}
            </>
          ) : (
            <FastImage
              defaultSource={require('@/assets/images/fallback.png')}
              fallback={require('@/assets/images/fallback.png')}
              source={{
                uri:
                  typeof item.media === 'object' ? item.media.url : item.media,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
              style={styles.media}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
        </>
      )}
      <View style={styles.postReactions}>
        <TouchableOpacity style={styles.reactionButton} onPress={likeAPost}>
          <Like isLiked={reactions.like} style={styles.like} />
        </TouchableOpacity>
        <Text style={styles.like}>
          {item?.postLikes &&
            item?.postDislikes &&
            item?.postLikes?.length - item?.postDislikes?.length}
        </Text>
        <TouchableOpacity style={styles.reactionButton} onPress={disLikeAPost}>
          <Dislike isLiked={reactions.dislike} style={styles.like} />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => fetchPostComments(item.id)}>
            <Comment />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reactionButtonGap}
            onPress={sharePost}>
            <ShareIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reactionButtonGap}
            onPress={reportPost}>
            <Report />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostItem;
