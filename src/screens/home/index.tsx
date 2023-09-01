import {Link} from 'components';
import {COLORS, MARGINS} from '../../constants';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {HomeScreenProps} from 'types';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const feedData = [
    {
      id: '1',
      title: 'Post 1',
      content: 'This is the content of the first post.',
    },
    {
      id: '2',
      title: 'Post 2',
      content: 'This is the content of the second post.',
    },
    {
      id: '3',
      title: 'Post 3',
      content: 'This is the content of the third post.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>Welcome to the Home Screen</Text>
        </View>

        <View style={styles.feed}>
          {feedData.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.feedItem}
              onPress={() =>
                // navigation.navigate('PostDetail', {postId: item.id})
                console.log('hello')
              }>
              <Text style={styles.feedTitle}>{item.title}</Text>
              <Text style={styles.feedContent}>{item.content}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Link
        text={'Back to Start'}
        onPress={() => navigation.navigate('SignIn')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: MARGINS.general,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  feed: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  feedItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  feedContent: {
    fontSize: 16,
    color: 'gray',
  },
});

export default HomeScreen;
