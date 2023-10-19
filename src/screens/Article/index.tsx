import React, {useEffect, useState} from 'react';
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
import HomeService from '@/services/home';
import {FeedItem} from '@/interfaces';
import {Loading} from '@/components';
const Article: React.FC<ArticleScreenProps> = ({route}) => {
  const {
    params: {id, article},
  } = route;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [articleData, setArticleData] = useState(article);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleData && id) {
        setLoading(true);
        try {
          const fetchedArticle = (await HomeService.fetchArticle(
            id,
          )) as FeedItem;
          setArticleData(fetchedArticle);
        } catch (error) {
          console.error('Error fetching article: ', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArticle();
  }, [articleData, id]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = async () => {
    if (!articleData) {
      return;
    }

    try {
      await Share.share({
        message: `Check out this article: ${
          articleData.title
        } at CareerNetwork.co \n\n ${`https://careernetwork.co/article/${articleData._id}`}`,
      });
    } catch (error) {
      console.error('Error sharing article: ', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {articleData && (
          <View>
            <Image
              source={{uri: articleData.coverImage}}
              style={styles.media}
            />
            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Image
                  source={require('@/assets/images/back.png')}
                  style={styles.backButtonText}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.shareButton}
                onPress={handleShare}>
                <Text style={styles.shareButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>{articleData.title}</Text>
              <RenderHtml
                contentWidth={WINDOW_WIDTH}
                source={{html: articleData.content || ''}}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightBlueBackground,
  },
  media: {
    width: '100%',
    height: 300,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 5,
    color: COLORS.primary,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  articleContent: {
    padding: 20,
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Article;
