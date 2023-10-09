import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import {styles} from '@/screens/home/styles';
import {
  FeedCommentsResponse,
  PostCommentInterface,
  ReactionInterface,
  ReplyCommentInterface,
  UserInterface,
} from '@/interfaces';
import {getUID} from '@/utils/functions';
import {formatFirebaseTimestamp} from '@/utils';
import {Comment, Like, Dislike, SendIcon} from '@/assets/icons';
import StorageService from '@/services/Storage';
import FirebaseService from '@/services/Firebase';
import HomeService from '@/services/home';
import ToastService from '@/services/toast';

const RepliesContainer = ({
  replies,
  postId,
  setComments,
  commentId,
}: {
  commentId: string;
  replies: ReplyCommentInterface[];
  postId: string;
  setComments: React.Dispatch<
    React.SetStateAction<{
      postId: string;
      loading: boolean;
      comments: FeedCommentsResponse[];
      showComments: boolean;
    }>
  >;
}) => {
  const [reply, setReply] = useState('');

  const handleAddNewReply = async () => {
    const payload = {
      dislikes: [] as ReactionInterface[],
      id: FirebaseService.generateUniqueId(),
      likes: [] as ReactionInterface[],
      text: reply,
      userId: (await getUID()) as string,
      user: (await StorageService.getItem('user')) as UserInterface,
      timestamp: FirebaseService.serverTimestamp(),
    } as ReplyCommentInterface;

    setReply('');
    const response = await HomeService.addReply(postId, commentId, payload);
    if (response) {
      setComments(prev => {
        const targetComment = prev.comments.find(
          comment => comment.id === commentId,
        );

        if (targetComment) {
          targetComment.replies.push(payload);
        }
        return {...prev};
      });
    }
  };

  return (
    <>
      <View style={styles.inputFieldContainer}>
        <TextInput
          placeholder="Write a reply"
          value={reply}
          onChangeText={setReply}
          style={styles.input}
        />
        {reply && (
          <TouchableOpacity onPress={handleAddNewReply}>
            <SendIcon />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={replies}
        renderItem={({item}) => (
          <View style={styles.replyContainer}>
            <Image
              source={
                item?.user?.photoUrl
                  ? {uri: item.user.photoUrl}
                  : require('@/assets/images/user.png')
              }
              style={styles.commentImage}
            />
            <Text style={styles.replyAuthor}>{item.user.name}</Text>
            <Text style={styles.reply}>{item.text}</Text>
          </View>
        )}
      />
    </>
  );
};

const PostComment = ({item, setComments, postId}: PostCommentInterface) => {
  const [reactions, setReactions] = useState({
    like: false,
    dislike: false,
  });
  const [showReplies, setShowReplies] = useState(false);

  const isPostLikedByUser = async () => {
    const UID = await getUID();
    const response = item.likes?.some(like => like.likedBy === UID) || false;

    setReactions(prev => ({...prev, like: response}));
  };

  const isPostDisLikedByUser = async () => {
    const UID = await getUID();
    const response = item.dislikes?.some(like => like.likedBy === UID) || false;
    setReactions(prev => ({...prev, dislike: response}));
  };

  useEffect(() => {
    isPostDisLikedByUser();
    isPostLikedByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likeAComment = async () => {
    try {
      const UID = (await getUID()) as string;
      let action = 'like';
      if (reactions.dislike) {
        setReactions({dislike: false, like: true});
        await HomeService.removeDisLikeAndLike(postId, item.id);
        action = 'dislike';
      } else if (reactions.like) {
        setReactions({dislike: false, like: false});
        await HomeService.removeLikeComment(postId, item.id);
        action = 'removeLike';
      } else {
        setReactions(prev => ({...prev, like: true}));
        await HomeService.likeComment(postId, item.id);
      }

      setComments(prev => {
        const updatedComments = prev.comments.map(comment => {
          if (comment.id === item.id) {
            if (action === 'dislike') {
              comment.likes = comment.dislikes
                .filter(like => like.likedBy !== UID)
                .concat({
                  likedBy: UID,
                  timestamp: formatFirebaseTimestamp(
                    FirebaseService.serverTimestamp(),
                    'dateTime',
                  ) as any,
                });
            } else if (action === 'like') {
              comment.likes.push({
                likedBy: UID,
                timestamp: formatFirebaseTimestamp(
                  FirebaseService.serverTimestamp(),
                  'dateTime',
                ) as any,
              });
            } else if (action === 'removeLike') {
              comment.likes = comment.likes.filter(
                like => like.likedBy !== UID,
              );
            }
          }
          return comment;
        });

        const sortedComments = HomeService.sortComments(updatedComments);
        return {...prev, comments: sortedComments};
      });

      ToastService.showSuccess(
        action === 'like'
          ? 'Post Comment Liked'
          : action === 'dislike'
          ? 'Post Comment Disliked'
          : 'Post Comment Like Removed',
      );
    } catch (error) {
      console.error('Error while performing action:', error);
    }
  };

  const dislikeAComment = async () => {
    try {
      const UID = (await getUID()) as string;
      let action = 'dislike';
      if (reactions.dislike) {
        await HomeService.removeDislikeComment(postId, item.id);
        action = 'removeDislike';
      } else if (reactions.like) {
        await HomeService.removeLikeAndDislikeComment(postId, item.id);

        action = 'like';
      } else {
        await HomeService.dislikeComment(postId, item.id);
        action = 'dislike';
      }

      setReactions(prev => ({
        ...prev,
        like: false,
        dislike: action === 'dislike',
      }));

      setComments(prev => {
        const updatedComments = prev.comments.map(comment => {
          if (comment.id === item.id) {
            if (action === 'dislike') {
              comment.dislikes.push({
                likedBy: UID,
                timestamp: formatFirebaseTimestamp(
                  FirebaseService.serverTimestamp(),
                  'dateTime',
                ) as any,
              });
            } else if (action === 'removeDislike') {
              comment.dislikes = comment.dislikes.filter(
                dislike => dislike.likedBy !== UID,
              );
            }
          }
          return comment;
        });

        const sortedComments = HomeService.sortComments(updatedComments);
        return {...prev, comments: sortedComments};
      });

      ToastService.showSuccess(
        action === 'dislike'
          ? 'Post Comment Disliked'
          : 'Post Comment Dislike Removed',
      );
    } catch (error) {
      console.error('Error while performing action:', error);
    }
  };

  return (
    <View style={styles.comment}>
      <View style={styles.author}>
        <Image
          source={
            item?.user?.photoUrl
              ? {uri: item.user.photoUrl}
              : require('@/assets/images/user.png')
          }
          style={styles.commentImage}
        />
        <View>
          <Text style={styles.commentAuthorName}>{item.user.name}</Text>

          <Text style={styles.commentAuthorTagline}>
            {formatFirebaseTimestamp(item.timestamp, 'dateTime')}
          </Text>
        </View>
      </View>
      <View style={styles.commentContainer}>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={[styles.postReactions, styles.postReactionsForComments]}>
          <TouchableOpacity
            style={[styles.reactionButton, styles.reactionButtonsBordered]}
            onPress={likeAComment}>
            <Like isLiked={reactions.like} />
          </TouchableOpacity>
          <Text style={styles.like}>
            {item.likes.length - item.dislikes.length}
          </Text>
          <TouchableOpacity
            style={[styles.reactionButton, styles.reactionButtonsBordered]}
            onPress={dislikeAComment}>
            <Dislike isLiked={reactions.dislike} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconsContainer}
            onPress={() => setShowReplies(!showReplies)}>
            <Comment />
            <Text style={styles.repliesText}>
              {item.replies.length} Replies
            </Text>
          </TouchableOpacity>
        </View>
        {showReplies && (
          <RepliesContainer
            replies={item.replies}
            postId={postId}
            setComments={setComments}
            commentId={item.id}
          />
        )}
      </View>
    </View>
  );
};

export default PostComment;
