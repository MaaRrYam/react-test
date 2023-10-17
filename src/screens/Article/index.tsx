import React from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Share,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

import {COLORS} from '@/constants';
import {ArticleScreenProps, RootStackParamList} from '@/types';

const Article: React.FC<ArticleScreenProps> = ({route}) => {
  const {
    params: {article},
  } = route;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${article.title}`,
        url: article._id,
      });
    } catch (error) {
      console.error('Error sharing article: ');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.articleContainer}>
        <Image source={{uri: article.coverImage}} style={styles.media} />
        <View style={styles.articleContent}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>{'Back'}</Text>
          </TouchableOpacity>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <RenderHtml
            contentWidth={WINDOW_WIDTH}
            source={{html: article.content || ''}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightBlueBackground,
  },
  articleContainer: {
    width: '100%',
  },
  media: {
    width: '100%',
    height: 200,
  },
  articleContent: {
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  backButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Article;
