import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
  SafeAreaView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Dislike, Like, Report, ShareIcon} from '@/assets/icons';
import {PostScreenProps, RootStackParamList} from '@/types';
import {getUID} from '@/utils/functions';
import ToastService from '@/services/toast';
import styles from './styles';
import FirebaseService from '@/services/Firebase';
import HomeService from '@/services/home';
import {
  removeLike,
  addLikeAndRemoveDislike,
  addLike,
  removeDisLike,
  addDislikeAndRemoveLike,
  addDislike,
  removeReportedPostFromFeed,
} from '@/store/features/homeSlice';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {FeedCommentsResponse, ReactionInterface} from '@/interfaces';
import PostComments from '@/components/Feed/PostComments';
import {Loading} from '@/components';
import {styles as homeStyles} from '@/screens/home/styles';

const PostScreen: React.FC<PostScreenProps> = ({route}) => {
  const {
    params: {item, id},
  } = route;

  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [comments, setComments] = useState({
    postId: '',
    loading: false,
    comments: [] as FeedCommentsResponse[],
    showComments: false,
  });
  const [postItem, setPostItem] = useState(item);
  const [loading, setLoading] = useState(item ? false : true);

  const [reactions, setReactions] = useState({
    like: false,
    dislike: false,
  });

  const isPostLikedByUser = async () => {
    const UID = await getUID();
    if (postItem) {
      const response =
        postItem.postLikes?.some(
          (like: ReactionInterface) => like.likedBy === UID,
        ) || false;
      setReactions(prev => ({...prev, like: response}));
    }
  };

  const isPostDisLikedByUser = async () => {
    const UID = await getUID();

    if (postItem) {
      const response =
        postItem.postDislikes?.some(
          (like: ReactionInterface) => like.likedBy === UID,
        ) || false;
      setReactions(prev => ({...prev, dislike: response}));
    }
  };

  const likeAPost = async () => {
    const UID = (await getUID()) as string;
    if (reactions.like) {
      dispatch(
        removeLike({
          id: postItem!.id,
          reaction: {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        }),
      );
      setReactions(prev => ({...prev, like: false}));
      const response = await HomeService.removeLike(postItem!.id, UID);
      if (response) {
        ToastService.showSuccess('Post Like Removed');
      }

      return;
    } else if (reactions.dislike) {
      dispatch(
        addLikeAndRemoveDislike({
          id: postItem!.id,
          reaction: {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        }),
      );
      setReactions({like: true, dislike: false});
      const response = await HomeService.removeDisLikeAndLike(
        postItem!.id,
        UID,
      );
      if (response) {
        ToastService.showSuccess('Post Disliked');
      }
      return;
    } else {
      dispatch(
        addLike({
          id: postItem!.id,
          reaction: {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        }),
      );
      setReactions(prev => ({...prev, like: true}));
      const response = await HomeService.likeAPost(postItem!.id, UID);
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
          id: postItem!.id,
          reaction: {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        }),
      );
      setReactions(prev => ({...prev, dislike: false}));
      const response = await HomeService.removeDislike(postItem!.id, UID);
      if (response) {
        ToastService.showSuccess('Post Dislike Removed');
      }
      return;
    } else if (reactions.like) {
      dispatch(
        addDislikeAndRemoveLike({
          id: postItem!.id,
          reaction: {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        }),
      );
      setReactions({like: false, dislike: true});
      const response = await HomeService.removeLikeAndDisLike(
        postItem!.id,
        UID,
      );
      if (response) {
        ToastService.showSuccess('Post Liked');
      }
      return;
    } else {
      dispatch(
        addDislike({
          id: postItem!.id,
          reaction: {
            likedBy: UID,
            timestamp: FirebaseService.serverTimestamp(),
          },
        }),
      );

      setReactions(prev => ({...prev, dislike: true}));
      const response = await HomeService.disLikeAPost(postItem!.id, UID);
      if (response) {
        ToastService.showSuccess('Post Disliked');
      }
    }
  };

  const reportPost = async () => {
    if (postItem) {
      const response = await HomeService.reportAPost(
        postItem.id,
        postItem.authorId,
      );
      if (response) {
        dispatch(removeReportedPostFromFeed(postItem.id));
        ToastService.showSuccess('Post reported');
      }
    }
  };

  const sharePost = async () => {
    const {share, sharedAction, dismissedAction} = Share;

    const appUrl = 'cnmobile://post/' + postItem!.id;
    const shareOptions = {
      message: `Check out this Post at CareerNetwork.co \n\n ${appUrl}`,
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
  }, [postItem]);

  useEffect(() => {
    if (postItem) {
      setComments(prev => ({
        ...prev,
        loading: true,
        showComments: true,
        postId: postItem.id,
      }));
      HomeService.fetchPostComments(postItem.id).then(response => {
        if (response) {
          setComments(prev => ({...prev, loading: false, comments: response}));
        }
      });
    }
  }, [postItem]);

  useEffect(() => {
    if (id) {
      HomeService.fetchPost(id).then(response => {
        if (response) {
          setLoading(false);
          setPostItem(response);
        }
      });
    }
  }, [id]);

  const handleBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image
            source={require('@/assets/images/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={sharePost} style={styles.shareButton}>
            <ShareIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={reportPost}>
            <Report />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.postInfo}>
        {postItem?.media && (
          <FastImage
            source={{
              uri: postItem.media,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={styles.media}
          />
        )}
        <Text style={styles.feedContent}>{postItem?.text}</Text>
        <View style={homeStyles.postReactions}>
          <TouchableOpacity style={styles.reactionButton} onPress={likeAPost}>
            <Like isLiked={reactions.like} />
          </TouchableOpacity>
          <Text style={styles.like}>
            {postItem?.postLikes &&
              postItem.postDislikes &&
              postItem?.postLikes?.length - postItem?.postDislikes?.length}
          </Text>
          <TouchableOpacity
            style={styles.reactionButton}
            onPress={disLikeAPost}>
            <Dislike isLiked={reactions.dislike} />
          </TouchableOpacity>
        </View>
      </View>

      <PostComments
        postId={postItem?.id || ''}
        comments={comments.comments}
        loading={comments.loading}
        showComments={comments.showComments}
        setComments={setComments}
        isFromPost={true}
      />
    </SafeAreaView>
  );
};

export default PostScreen;
