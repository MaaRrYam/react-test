import React, {memo, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  FeedCommentsResponse,
  PostCommentsProps,
  UserInterface,
  ReactionInterface,
  ReplyCommentInterface,
} from '@/interfaces';
import {styles} from '@/screens/home/styles';
import {Loading} from '@/components';
import PostComment from './PostComment';
import {SendIcon} from '@/assets/icons';
import FirebaseService from '@/services/Firebase';
import {getUID} from '@/utils/functions';
import StorageService from '@/services/Storage';
import HomeService from '@/services/home';
import {COLORS, MARGINS} from '@/constants';
import {FlashList} from '@shopify/flash-list';
import ToastService from '@/services/toast';

const PostComments = ({
  postId,
  comments,
  loading,
  setComments,
  isFromPost,
}: PostCommentsProps) => {
  const [comment, setComment] = useState('');
  const [isCommentPosting, setIsCommentPosting] = useState(false);

  if (loading && isFromPost) {
    return (
      <View style={{marginTop: MARGINS.general}}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  if (loading) {
    return <Loading />;
  }

  const handleAddNewComment = async () => {
    setIsCommentPosting(true);
    const payload = {
      dislikes: [] as ReactionInterface[],
      id: FirebaseService.generateUniqueId(),
      likes: [] as ReactionInterface[],
      replies: [] as ReplyCommentInterface[],
      text: comment,
      userId: (await getUID()) as string,
      user: (await StorageService.getItem('user')) as UserInterface,
      timestamp: FirebaseService.serverTimestamp(),
    } as FeedCommentsResponse;

    const response = await HomeService.addComment(postId, payload);
    if (response) {
      setComment('');
      setComments(prev => ({
        ...prev,
        comments: [...prev.comments, payload],
      }));
    }
    ToastService.showSuccess('Comment added successfully');
    setIsCommentPosting(false);
  };

  return (
    <>
      <View style={[styles.commentFieldContainer]}>
        <TextInput
          placeholder="Add a comment"
          value={comment}
          onChangeText={setComment}
          style={[styles.input]}
          placeholderTextColor={COLORS.text}
        />
        {isCommentPosting ? (
          <ActivityIndicator color={COLORS.primary} size="small" />
        ) : comment ? (
          <TouchableOpacity onPress={handleAddNewComment}>
            <SendIcon />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.commentsContainer}>
        {isFromPost ? (
          <>
            {comments.map((item, index) => (
              <PostComment
                item={item}
                setComments={setComments}
                postId={postId}
                isFromPost={isFromPost}
                key={item.id || index}
              />
            ))}
          </>
        ) : (
          <FlashList
            data={comments}
            renderItem={({item}) => (
              <PostComment
                item={item}
                setComments={setComments}
                postId={postId}
                isFromPost={isFromPost}
              />
            )}
            estimatedItemSize={100}
            keyExtractor={(item, index) => item.id || index.toString()}
          />
        )}
      </View>
    </>
  );
};

export default memo(PostComments);
