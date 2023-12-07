import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Share,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import RenderHtml from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {ArticleScreenProps, RootStackParamList} from '@/types';
import HomeService from '@/services/home';
import {FeedItem, UserInterface} from '@/interfaces';
import {PrimaryButton, Loading} from '@/components';
import {CloseIcon} from '@/assets/icons';
import {formatFirebaseTimestamp} from '@/utils';
import {Timestamp} from 'firebase/firestore';
import {styles} from './styles';
import Cache from '@/cache';
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

  const fetchAuthorData = useCallback(async () => {
    if (await Cache.get(`user_${articleData?.authorId}`)) {
      setAuthorData(
        (await Cache.get(`user_${articleData?.authorId}`)) as UserInterface,
      );
    } else {
      setAuthorData(
        await HomeService.getAuthor(articleData?.authorId as string),
      );
    }
  }, [articleData]);

  useEffect(() => {
    fetchAuthorData();
  }, [fetchAuthorData]);
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
                  <PrimaryButton
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
              <FastImage
                defaultSource={require('@/assets/images/fallback.png')}
                fallback={require('@/assets/images/fallback.png')}
                source={{
                  uri: articleData.coverImage,
                  priority: 'high',
                  cache: 'web',
                }}
                resizeMode="cover"
                style={styles.media}
              />
              <View>
                <View style={styles.userInfoContainer}>
                  <FastImage
                    source={{
                      uri: authorData?.photoUrl,
                      priority: 'high',
                      cache: 'web',
                    }}
                    resizeMode="cover"
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

export default Article;
