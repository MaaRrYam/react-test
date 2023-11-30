import React from 'react';
import {View, TouchableOpacity, useWindowDimensions} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import FastImage from 'react-native-fast-image';

import {FeedItem} from '@/interfaces';
import {styles} from '@/screens/home/styles';
import {RootStackParamList} from '@/types';

const ArticleItem = ({item}: {item: FeedItem}) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const source = {
    html: `
${item.content!.substring(0, 300) + '....'}`,
  };

  const handleNavigate = () => {
    navigation.navigate('Article', {article: item});
  };

  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View style={styles.articleContainer}>
        <RenderHtml
          contentWidth={width}
          source={source}
          baseStyle={{color: 'black', alignItems: 'center'}}
        />
        <FastImage
          resizeMode="cover"
          defaultSource={require('@/assets/images/fallback.png')}
          fallback={require('@/assets/images/fallback.png')}
          source={{
            uri: item.coverImage,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.media}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ArticleItem;
