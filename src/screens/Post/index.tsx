import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import HomeService from '@/services/home';
import {formatFirebaseTimestamp} from '@/utils';
import {PostScreenProps, RootStackParamList} from '@/types';
import {FeedCommentsResponse} from '@/interfaces';
import {Loading, BottomSheet, PostComments} from '@/components';
import PostItem from '@/components/Feed/PostItem';
import {styles as homeStyles} from '@/screens/home/styles';
import styles from './styles';
import {BackArrow} from '@/assets/icons';

const PostScreen: React.FC<PostScreenProps> = ({route}) => {
  const {
    params: {item, id},
  } = route;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [comments, setComments] = useState({
    postId: '',
    loading: false,
    comments: [] as FeedCommentsResponse[],
    showComments: false,
  });
  const [postItem, setPostItem] = useState(item);
  const [loading, setLoading] = useState(item ? false : true);

  const fetchPostComments = useCallback(async (postId: string) => {
    setComments(prev => ({...prev, loading: true, showComments: true, postId}));
    const response = await HomeService.fetchPostComments(postId);
    setComments(prev => ({...prev, loading: false, comments: response}));
  }, []);

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

  const handleAuthorPress = useCallback(() => {
    if (postItem) {
      navigation.navigate('Profile', {uid: postItem.authorId});
    }
  }, [postItem, navigation]);

  const handleBack = () => {
    navigation.goBack();
  };

  if (loading || !postItem?.id) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <BackArrow width={30} height={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={homeStyles.feedItem}>
          <View style={homeStyles.authorInfo}>
            <TouchableOpacity onPress={handleAuthorPress}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                defaultSource={require('@/assets/images/user.png')}
                fallback={require('@/assets/images/user.png')}
                source={{
                  uri: postItem.author?.photoUrl,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
                style={homeStyles.userImage}
              />
            </TouchableOpacity>
            <View style={{marginLeft: 10}}>
              <TouchableOpacity onPress={handleAuthorPress}>
                <Text style={homeStyles.authorName}>
                  {postItem.author?.name}
                </Text>
                {postItem.author?.tagline && (
                  <Text style={homeStyles.authorTagline}>
                    {postItem.author?.tagline}
                  </Text>
                )}
              </TouchableOpacity>
              <Text style={homeStyles.postTime}>
                {formatFirebaseTimestamp(
                  postItem.editedTime || postItem.timestamp,
                  'dateTime',
                )}
              </Text>
            </View>
          </View>
          <PostItem item={postItem} fetchPostComments={fetchPostComments} />
        </View>
      </View>

      {comments.showComments && (
        <BottomSheet
          isVisible={comments.showComments}
          snapPoints={['20%', '90%']}
          onClose={() => setComments(prev => ({...prev, showComments: false}))}>
          <PostComments
            showComments={comments.showComments}
            comments={comments.comments}
            loading={comments.loading}
            setComments={setComments}
            postId={comments.postId}
          />
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

export default PostScreen;
