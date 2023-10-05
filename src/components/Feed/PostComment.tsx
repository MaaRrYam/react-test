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
            onPress={() => {}}>
            <Like isLiked={reactions.like} />
          </TouchableOpacity>
          <Text style={styles.like}>
            {item.likes.length - item.dislikes.length}
          </Text>
          <TouchableOpacity
            style={[styles.reactionButton, styles.reactionButtonsBordered]}
            onPress={() => {}}>
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
