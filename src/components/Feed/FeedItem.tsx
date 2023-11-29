import React from 'react';
import {View, Image, Text} from 'react-native';

import {FeedItemProps} from '@/interfaces';
import {styles} from '@/screens/home/styles';
import {formatFirebaseTimestamp} from '@/utils';
import PostItem from './PostItem';
import ArticleItem from './ArticleItem';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '@/constants';
import {TouchableOpacity} from 'react-native';

const FeedItemComponent = ({item, fetchPostComments}: FeedItemProps) => {
  const navigation = useNavigation();
  const handleAuthorPress = () => {
    navigation.navigate(SCREEN_NAMES.Profile, {UID: item.authorId});
  };

  return (
    <View style={styles.feedItem}>
      <View style={styles.authorInfo}>
        <Image source={{uri: item.author?.photoUrl}} style={styles.userImage} />
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
