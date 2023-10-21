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
import {COLORS, FONTS} from '@/constants';
import {ArticleScreenProps, RootStackParamList} from '@/types';
import HomeService from '@/services/home';
import {FeedItem, UserInterface} from '@/interfaces';
import {Button, Loading} from '@/components';
import {CloseIcon} from '@/assets/icons';
import FirebaseService from '@/services/Firebase';
import {formatFirebaseTimestamp} from '@/utils';
import {Timestamp} from 'firebase/firestore';
const Article: React.FC<ArticleScreenProps> = ({route}) => {
  const {
    params: {id, article},
  } = route;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [articleData, setArticleData] = useState(article);
  const [authorData, setAuthorData] = useState<UserInterface>();

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

  useEffect(() => {
    const fetchAuthor = async () => {
      const data = await FirebaseService.getDocument(
        'users',
        articleData?.authorId as string,
      );
      setAuthorData(data as UserInterface);
    };
    fetchAuthor();
  }, [articleData]);

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
          <>
            <View style={styles.header}>
              <View style={styles.headerButtonsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    handleBack();
                  }}
                  style={styles.closeButton}>
                  <CloseIcon />
                </TouchableOpacity>
                <View>
                  <Button
                    title="Share"
                    onPress={() => {
                      handleShare();
                    }}
                    style={styles.shareButton}
                    textColor="black"
                  />
                </View>
              </View>
            </View>
            <View style={styles.articleContainer}>
              <Text style={styles.articleTitle}>{article?.title}</Text>
              <Image
                source={{uri: articleData.coverImage}}
                style={styles.media}
              />
              <View>
                <View style={styles.userInfoContainer}>
                  <Image
                    source={{uri: authorData?.photoUrl}}
                    style={styles.userImage}
                  />
                  <View style={styles.userInfoTextContainer}>
                    <Text style={styles.userName}>{authorData?.name}</Text>
                    <Text style={styles.userSubData}>
                      {authorData?.tagline}
                    </Text>
                    <Text style={styles.userSubData}>
                      {!article?.edited
                        ? formatFirebaseTimestamp(
                            article?.timestamp as Timestamp,
                            'date',
                          )
                        : formatFirebaseTimestamp(
                            article?.editedTime,
                            'dateTime',
                          )}
                    </Text>
                  </View>
                </View>
              </View>
              <RenderHtml
                contentWidth={WINDOW_WIDTH}
                source={{html: articleData.content || ''}}
                baseStyle={styles.articleContent}
              />
            </View>
          </>
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
    height: 275,
    borderRadius: 5,
    objectFit: 'contain',
    marginTop: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 44,
    paddingBottom: 8,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  closeButton: {
    backgroundColor: COLORS.lightGrayBackground,
    width: 41,
    height: 41,
    borderRadius: 9999,
  },
  shareButton: {
    backgroundColor: COLORS.lightGrayBackground,
    paddingHorizontal: 28,
    paddingVertical: 11,
    borderRadius: 9999,
  },
  articleContainer: {paddingHorizontal: 19, paddingTop: 23},
  articleTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: FONTS.heading,
    alignItems: 'center',
    maxWidth: 346,
  },
  userInfoContainer: {
    marginVertical: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 43,
    height: 43,
    objectFit: 'contain',
    borderRadius: 10,
  },
  userInfoTextContainer: {marginLeft: 12},
  userName: {
    color: 'black',
    fontSize: FONTS.largeLabel,
    fontWeight: 'bold',
  },
  userSubData: {color: COLORS.text, fontSize: FONTS.bodyRegular},
  articleContent: {color: 'black'},
});

export default Article;
