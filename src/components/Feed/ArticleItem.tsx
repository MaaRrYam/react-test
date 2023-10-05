import React from 'react';
import {View, Image, TouchableOpacity, useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';

import {FeedItem} from '@/interfaces';
import {styles} from '@/screens/home/styles';

const ArticleItem = ({item}: {item: FeedItem}) => {
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

export default ArticleItem;
