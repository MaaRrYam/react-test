import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  BackArrow,
  Comment,
  Dislike,
  Like,
  Report,
  ShareIcon,
} from '@/assets/icons';
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
import {
  FeedCommentsResponse,
  ReactionInterface,
  UserInterface,
} from '@/interfaces';
import PostComments from '@/components/Feed/PostComments';
import {COLORS} from '@/constants';
import {formatFirebaseTimestamp} from '@/utils';
import {Timestamp} from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';

const PostScreen: React.FC<PostScreenProps> = ({route}) => {
  const {
    params: {item},
  } = route;

  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [authorData, setAuthorData] = useState<UserInterface>();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState({
    postId: '',
    loading: false,
    comments: [] as FeedCommentsResponse[],
    showComments: false,
  });

  const [reactions, setReactions] = useState({
    like: false,
    dislike: false,
  });

  const isPostLikedByUser = async () => {
    const UID = await getUID();
    const response =
      item.postLikes?.some((like: ReactionInterface) => like.likedBy === UID) ||
      false;
    setReactions(prev => ({...prev, like: response}));
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      const data = await FirebaseService.getDocument(
        'users',
        item?.authorId as string,
      );
      setAuthorData(data as UserInterface);
    };
    fetchAuthor();
  }, [item]);

  const isPostDisLikedByUser = async () => {
    const UID = await getUID();
    const response =
      item.postDislikes?.some(
        (like: ReactionInterface) => like.likedBy === UID,
      ) || false;
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

  useEffect(() => {
    setComments(prev => ({
      ...prev,
      loading: true,
      showComments: true,
      postId: item._id,
    }));
    HomeService.fetchPostComments(item._id).then(response => {
      if (response) {
        setComments(prev => ({...prev, loading: false, comments: response}));
      }
    });
  }, [item._id]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <BackArrow />
          </TouchableOpacity>
        </View>

        <View style={styles.postContainer}>
          <View style={styles.userInfoContainer}>
            <Image
              source={{uri: authorData?.photoUrl}}
              style={styles.userImage}
            />
            <View style={styles.userInfoTextContainer}>
              <Text style={styles.userName}>{authorData?.name}</Text>
              <Text style={styles.userSubData}>{authorData?.tagline}</Text>
              <Text style={styles.userSubData}>
                {!item?.edited
                  ? formatFirebaseTimestamp(
                      item?.creationTime as Timestamp,
                      'date',
                    )
                  : formatFirebaseTimestamp(item?.editedTime, 'dateTime')}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.feedContent}>{item.text}</Text>
            {item.media && (
              <Image source={{uri: item.media}} style={styles.media} />
            )}
            <View style={styles.actionContainer}>
              <View style={styles.reactionContainer}>
                <TouchableOpacity
                  style={styles.reactionButton}
                  onPress={likeAPost}>
                  <Like isLiked={reactions.like} />
                </TouchableOpacity>
                <Text style={styles.like}>
                  {item?.postLikes?.length - item?.postDislikes?.length}
                </Text>
                <TouchableOpacity
                  style={styles.reactionButton}
                  onPress={disLikeAPost}>
                  <Dislike isLiked={reactions.dislike} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setShowComments(!showComments);
                }}
                style={styles.actionButton}>
                <Comment />
              </TouchableOpacity>
              <TouchableOpacity onPress={sharePost} style={styles.actionButton}>
                <ShareIcon />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={reportPost}
                style={styles.actionButton}>
                <Report />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {showComments && (
          <View
            style={{
              backgroundColor: 'white',
              marginVertical: 10,
              paddingBottom: 10,
            }}>
            <PostComments
              postId={item._id}
              comments={comments.comments}
              loading={comments.loading}
              showComments={comments.showComments}
              setComments={setComments}
              isFromPost={true}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostScreen;
