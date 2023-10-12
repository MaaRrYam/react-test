import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';

import {PostCommentsProps} from '@/interfaces';
import {styles} from '@/screens/home/styles';
import {Empty, Loading} from '@/components';

const PostComments = ({comments, loading}: PostCommentsProps) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.commentsContainer}>
      {comments.length ? (
        <View style={styles.comments}>
          <FlatList
            data={comments}
            renderItem={({item}) => (
              <View style={styles.comment}>
                <View style={styles.author}>
                  <Image
                    source={
                      item?.user?.photoUrl
                        ? {uri: item?.user?.photoUrl}
                        : require('@/assets/images/user.png')
                    }
                    style={styles.commentImage}
                  />
                  <View>
                    <Text style={styles.commentAuthorName}>
                      {item.user?.name}
                    </Text>
                    {item.user?.tagline && (
                      <Text style={styles.commentAuthorTagline}>
                        {item.user?.tagline}
                      </Text>
                    )}
                  </View>
                </View>
                <Text style={styles.commentText}>{item?.text}</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <Empty />
      )}
    </View>
  );
};

export default PostComments;
