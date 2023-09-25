import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

import {FeedItem} from '@/interfaces';
import {styles} from '@/screens/home/styles';
import {Comment, Dislike, Like, Report, Share} from '@/assets/icons';

const FeedItemComponent = ({item}: FeedItem) => {
  return (
    <View style={styles.feedItem}>
      <View style={styles.authorInfo}>
        <Image source={item?.author?.avatar} style={styles.userImage} />
        <View style={{marginLeft: 10}}>
          <Text style={styles.authorName}>{item?.author?.name}</Text>
          <Text style={styles.authorTagline}>
            {item?.author?.tagline || 'Tagline'}
          </Text>
          <Text style={styles.authorTagline}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.feedContent}>{item.content}</Text>
      {item.media && <Image source={item.media} style={styles.media} />}
      <View style={styles.postReactions}>
        <View style={styles.reactionButton}>
          <Like />
        </View>
        <Text style={styles.like}>{item.likes}</Text>
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
    </View>
  );
};

export default FeedItemComponent;
