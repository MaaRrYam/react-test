import React, {useState} from 'react';
import {View, FlatList, TextInput, TouchableOpacity} from 'react-native';

import {
  FeedCommentsResponse,
  PostCommentsProps,
  UserInterface,
  ReactionInterface,
  ReplyCommentInterface,
} from '@/interfaces';
import {styles} from '@/screens/home/styles';
import {Empty, Loading} from '@/components';
import PostComment from './PostComment';
import {SendIcon} from '@/assets/icons';
import FirebaseService from '@/services/Firebase';
import {getUID} from '@/utils/functions';
import StorageService from '@/services/Storage';
import HomeService from '@/services/home';

const PostComments = ({
  postId,
  comments,
  loading,
  setComments,
}: PostCommentsProps) => {
  const [comment, setComment] = useState('');

  if (loading) {
    return <Loading />;
  }

  const handleAddNewComment = async () => {
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

    setComment('');
    const response = await HomeService.addComment(postId, payload);
    if (response) {
      setComments(prev => ({
        ...prev,
        comments: [...prev.comments, payload],
      }));
    }
  };

  return (
    <>
      <View style={styles.commentFieldContainer}>
        <TextInput
          placeholder="Add a comment"
          value={comment}
          onChangeText={setComment}
          style={styles.input}
        />
        {comment && (
          <TouchableOpacity onPress={handleAddNewComment}>
            <SendIcon />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.commentsContainer}>
        {comments.length ? (
          <View style={styles.comments}>
            <FlatList
              data={comments}
              renderItem={({item}: {item: FeedCommentsResponse}) => (
                <PostComment
                  item={item}
                  setComments={setComments}
                  postId={postId}
                />
              )}
            />
          </View>
        ) : (
          <Empty />
        )}
      </View>
    </>
  );
};

export default PostComments;
