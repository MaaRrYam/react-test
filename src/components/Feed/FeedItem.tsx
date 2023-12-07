import React from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {StackNavigationProp} from '@react-navigation/stack';

import {FeedItemProps} from '@/interfaces';
import {styles} from '@/screens/home/styles';
import {formatFirebaseTimestamp} from '@/utils';
import PostItem from './PostItem';
import ArticleItem from './ArticleItem';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {RootStackParamList} from '@/types';

const FeedItemComponent = ({item, fetchPostComments}: FeedItemProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleAuthorPress = () => {
    navigation.navigate('Profile', {uid: item.authorId});
  };

  return (
    <View style={styles.feedItem}>
      <View style={styles.authorInfo}>
        <TouchableOpacity onPress={handleAuthorPress}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            defaultSource={require('@/assets/images/user.png')}
            fallback={require('@/assets/images/user.png')}
            source={{
              uri: item.author?.photoUrl,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={styles.userImage}
          />
        </TouchableOpacity>
        <View style={{marginLeft: 10}}>
          <TouchableOpacity onPress={handleAuthorPress}>
            <Text style={styles.authorName}>{item.author?.name}</Text>
            {item.author?.tagline && (
              <Text style={styles.authorTagline}>{item.author?.tagline}</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.postTime}>
            {formatFirebaseTimestamp(
              item.editedTime || item.timestamp,
              'dateTime',
            )}
          </Text>
        </View>
      </View>
      {item.feedType === 'post' ? (
        <PostItem item={item} fetchPostComments={fetchPostComments} />
      ) : (
        <ArticleItem item={item} />
      )}
    </View>
  );
};

export default React.memo(FeedItemComponent);
