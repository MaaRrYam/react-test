import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import {FeedItem} from '@/interfaces';
import {styles} from '@/screens/home/styles';
import {Comment, Dislike, Like, Report, Share} from '@/assets/icons';
import {formatFirebaseTimestamp} from '@/utils';
import {getUID} from '@/utils/functions';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import HomeService from '@/services/home';
import {addDislike, addLike} from '@/store/features/homeSlice';
import FirebaseService from '@/services/Firebase';
import ToastService from '@/services/toast';

const RenderPost = ({item}: {item: FeedItem}) => {
  const dispatch = useAppDispatch();

  let UID: string;
  (async () => {
    const response = await getUID();
    if (response) {
      UID = response;
    }
  })();

  const isPostLikedByUser =
    item.postLikes?.some(like => like.likedBy === UID) || false;
  const isPostDisLikedByUser =
    item.postDislikes?.some(like => like.likedBy === UID) || false;

  const likeAPost = async () => {
    dispatch(
      addLike({
        id: item.id,
        reaction: {
          likedBy: UID,
          timestamp: FirebaseService.serverTimestamp(),
        },
      }),
    );
    const response = await HomeService.likeAPost(item.id, UID);
    if (response) {
      ToastService.showSuccess('Post liked');
    }
  };

  const disLikeAPost = async () => {
    dispatch(
      addDislike({
        id: item.id,
        reaction: {
          likedBy: UID,
          timestamp: FirebaseService.serverTimestamp(),
        },
      }),
    );

    const response = await HomeService.disLikeAPost(item.id, UID);
    if (response) {
      ToastService.showSuccess('Post Disliked');
    }
  };

  return (
    <>
      <Text style={styles.feedContent}>{item.text}</Text>
      {item.media && <Image source={{uri: item.media}} style={styles.media} />}
      <View style={styles.postReactions}>
        <TouchableOpacity style={styles.reactionButton} onPress={likeAPost}>
          <Like isLiked={isPostLikedByUser} />
        </TouchableOpacity>
        <Text style={styles.like}>
          {item?.postLikes!.length - item?.postDislikes!.length}
        </Text>
        <TouchableOpacity style={styles.reactionButton} onPress={disLikeAPost}>
          <Dislike isLiked={isPostDisLikedByUser} />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Comment />
          </TouchableOpacity>
          <TouchableOpacity>
            <Share />
          </TouchableOpacity>
          <TouchableOpacity>
            <Report />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const RenderArticle = ({item}: {item: FeedItem}) => {
  const {width} = useWindowDimensions();

  const source = {
    html: `
${item.content!.substring(0, 300) + '....'}`,
  };

  return (
    <TouchableOpacity onPress={() => console.log('article Pressed')}>
      <View style={styles.articleContainer}>
        <RenderHtml contentWidth={width} source={source} />
        <Image source={{uri: item.coverImage}} style={styles.media} />
      </View>
    </TouchableOpacity>
  );
};

const FeedItemComponent = ({item}: {item: FeedItem}) => {
  return (
    <View style={styles.feedItem}>
      <View style={styles.authorInfo}>
        <Image source={{uri: item.author.photoUrl}} style={styles.userImage} />
        <View style={{marginLeft: 10}}>
          <Text style={styles.authorName}>{item.author?.name}</Text>
          {/* <Text style={styles.authorTagline}>
          {item?.author.tagline || 'Tagline'}
        </Text> */}
          <Text style={styles.authorTagline}>
            {formatFirebaseTimestamp(
              item.editedTime || item.timestamp,
              'dateTime',
            )}
          </Text>
        </View>
      </View>
      {item.feedType === 'post' ? (
        <RenderPost item={item} />
      ) : (
        <RenderArticle item={item} />
      )}
    </View>
  );
};

export default FeedItemComponent;
