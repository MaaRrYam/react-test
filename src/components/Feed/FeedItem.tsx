import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import RenderHtml from 'react-native-render-html';

import {FeedItem} from '@/interfaces';
import {styles} from '@/screens/home/styles';
import {Comment, Dislike, Like, Report, Share} from '@/assets/icons';
import {formatFirebaseTimestamp} from '@/utils';

const renderPost = (item: FeedItem) => (
  <>
    <Text style={styles.feedContent}>{item.text}</Text>
    {item.media && <Image source={{uri: item.media}} style={styles.media} />}
    <View style={styles.postReactions}>
      <View style={styles.reactionButton}>
        <Like />
      </View>
      <Text style={styles.like}>
        {item?.postLikes!.length - item?.postDislikes!.length}
      </Text>
      <View style={styles.reactionButton}>
        <Dislike />
      </View>

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

const RenderArticle = ({item}: {item: FeedItem}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(prev => !prev);
  };

  const source = {
    html: `
<p style='text-align:center;'>
  Hello World!
</p>`,
  };

  return (
    <View style={styles.articleContainer}>
      <Text style={styles.feedContent}>
        {showFullContent
          ? item.content
          : item.content!.substring(0, 200) + '...'}
      </Text>
      <RenderHtml source={source} />
      {item.content!.length > 200 && (
        <TouchableOpacity onPress={toggleContent}>
          <Text style={styles.showMoreText}>
            {showFullContent ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
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
        renderPost(item)
      ) : (
        <RenderArticle item={item} />
      )}
    </View>
  );
};

export default FeedItemComponent;
