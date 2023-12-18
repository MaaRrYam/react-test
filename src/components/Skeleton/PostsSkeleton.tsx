import React from 'react';
import {Dimensions, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FlashList} from '@shopify/flash-list';

import {
  ShimmerLayout,
  ShimmerLayoutContainerType,
} from 'react-native-gradient-shimmer';
import {COLORS, PADDING} from '@/constants';

const width = Dimensions.get('screen').width - 30;

const data = Array.from({length: 5}, (_, index) => ({
  id: index.toString(),
}));

const layoutExample: ShimmerLayoutContainerType = {
  content: [
    {
      flexDirection: 'column',
      marginBottom: 20,
      content: [
        // author
        {
          flexDirection: 'row',
          content: [
            {
              height: 40,
              width: 60,
              marginLeft: 16,
              marginRight: 6,
            },
            {
              flexDirection: 'column',
              content: [
                {
                  height: 10,
                  width: width / 3,
                },
                {
                  marginTop: 5,
                  height: 10,
                  width: width * 0.65,
                },
                {
                  marginTop: 5,
                  height: 10,
                  width: width / 5,
                },
              ],
            },
          ],
        },
        // content
        {
          width,
          height: 10,
          marginLeft: 16,
          marginTop: 5,
        },
        // image
        {
          width,
          height: 200,
          marginLeft: 16,
          marginTop: 5,
        },
      ],
    },
  ],
};

const PostSkeleton = () => (
  <ShimmerLayout
    LinearGradientComponent={LinearGradient}
    layout={layoutExample}
  />
);

const PostsSkeleton = () => (
  <View
    style={{
      backgroundColor: COLORS.white,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      padding: PADDING.general,
    }}>
    <FlashList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => <PostSkeleton key={item.id} />}
      ListEmptyComponent={<PostSkeleton />}
      estimatedItemSize={10}
      showsVerticalScrollIndicator={false}
    />
  </View>
);

export default PostsSkeleton;
