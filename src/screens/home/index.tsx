import {IconButton} from 'components';
import {BORDER_RADIUS, COLORS, PADDING} from '../../constants';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import {HomeScreenProps} from 'types';

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const feedData = [
    {
      id: '1',
      title: 'Post 1',
      content: 'This is the content of the first post.',
      author: {
        name: 'John Doe',
        tagline: 'UX Designer',
        avatar: require('@/assets/images/user.png'),
      },
      media: require('@/assets/images/post.png'),
      time: '2 hours ago',
      likes: 20,
      comments: 2,
    },
    {
      id: '12',
      title: 'Post 1',
      content: 'This is the content of the first post.',
      author: {
        name: 'John Doe',
        tagline: 'UX Designer',
        avatar: require('@/assets/images/user.png'),
      },
      media: require('@/assets/images/post.png'),
      time: '2 hours ago',
      likes: 20,
      comments: 2,
    },
    {
      id: '21',
      title: 'Post 1',
      content: 'This is the content of the first post.',
      author: {
        name: 'John Doe',
        tagline: 'UX Designer',
        avatar: require('@/assets/images/user.png'),
      },
      time: '2 hours ago',
      likes: 20,
      comments: 2,
    },
    {
      id: '112',
      title: 'Post 1',
      content: 'This is the content of the first post.',
      author: {
        name: 'John Doe',
        tagline: 'UX Designer',
        avatar: require('@/assets/images/user.png'),
      },
      time: '2 hours ago',
      likes: 20,
      comments: 2,
    },
  ];

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Image
              source={require('@/assets/images/apple.png')}
              style={styles.logo}
            />
            <View style={styles.headerIcons}>
              <IconButton
                imageSource={require('@/assets/images/searchIcon.png')}
                onPress={() => console.log('Search Icon Pressed')}
                style={{marginLeft: 20, backgroundColor: '#F4F4F4'}}
              />
              <IconButton
                imageSource={require('@/assets/images/messages.png')}
                onPress={() => console.log('Search Icon Pressed')}
                style={{marginLeft: 20, backgroundColor: '#F4F4F4'}}
              />
            </View>
          </View>
          <View style={styles.subheader}>
            <Image
              source={require('@/assets/images/user.png')}
              style={styles.userImage}
            />

            <TextInput style={styles.searchBar} placeholder="Start a Post" />
          </View>
        </View>

        <View style={styles.feedContainer}>
          <FlatList
            data={feedData}
            renderItem={({item}) => (
              <View style={styles.feedItem}>
                <View style={styles.authorInfo}>
                  <Image source={item.author.avatar} style={styles.userImage} />
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.authorName}>{item.author.name}</Text>
                    <Text style={styles.authorTagline}>
                      {item.author.tagline}
                    </Text>
                    <Text style={styles.authorTagline}>{item.time}</Text>
                  </View>
                </View>
                <Text style={styles.feedContent}>{item.content}</Text>
                {item.media && (
                  <Image source={item.media} style={styles.media} />
                )}
                <View style={styles.postReactions}>
                  <View style={styles.reactionButton}>
                    <Image source={require('@/assets/icons/like.png')} />
                  </View>
                  <Text style={styles.like}>{item.likes}</Text>
                  <View style={styles.reactionButton}>
                    <Image source={require('@/assets/icons/dislike.png')} />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flex: 3 / 4,
                      marginLeft: 15,
                    }}>
                    <Image source={require('@/assets/icons/comment.png')} />
                    <Image source={require('@/assets/icons/share.png')} />
                    <Image source={require('@/assets/icons/report.png')} />
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: COLORS.lightBackground,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  postReactions: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  reactionButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#F4F4F4',
    borderRadius: BORDER_RADIUS.general * 2,
  },
  like: {
    paddingTop: 7,
    marginHorizontal: 8,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: PADDING.general,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 20,
  },
  subheader: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: PADDING.general,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    maxHeight: 100,
  },
  searchBar: {
    flex: 1,
    borderRadius: BORDER_RADIUS.general * 2,
    backgroundColor: COLORS.lightBackground,
    paddingHorizontal: 10,
    paddingVertical: PADDING.general - 6,
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  userImage: {
    width: 43,
    height: 43,
    borderRadius: 15,
  },
  feedContainer: {
    flex: 1,
    backgroundColor: COLORS.lightBlueBackground,
    paddingTop: PADDING.general,
  },
  feedItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    elevation: 2,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  feedContent: {
    fontSize: 13,
    color: COLORS.black,
    marginTop: 10,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorText: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  authorTagline: {
    fontSize: 14,
    color: 'gray',
  },
  postTime: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  moreIcon: {
    alignSelf: 'flex-end',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: 'gray',
  },
});

export default HomeScreen;
