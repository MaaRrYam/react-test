import React from 'react';
import {View, SafeAreaView, Image, TextInput} from 'react-native';

import {Header, Feed} from '@/components';
import {HomeScreenProps} from '@/types';
import {homeStyles} from '@/styles/home';
import {styles} from './styles';
import useUserManagement from '@/hooks/useUserManagement';
import Cache from '@/cache';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {user} = useUserManagement();
  const {feed} = useAppSelector(state => state.home);

  useFocusEffect(() => {
    return () => {
      (async () => {
        const lastFeedItems = feed?.slice(feed.length - 8);
        await Cache.set('feed', lastFeedItems);
      })();
    };
  });

  return (
    <View style={homeStyles.outerContainer}>
      <SafeAreaView style={homeStyles.container}>
        <View>
          <Header navigation={navigation} />
          <View style={homeStyles.subheader}>
            <Image
              source={
                user?.photoUrl
                  ? {uri: user.photoUrl}
                  : require('@/assets/images/user.png')
              }
              style={styles.userImage}
            />

            <TextInput style={styles.searchBar} placeholder="Start a Post" />
          </View>
        </View>

        <View style={styles.feedContainer}>
          <Feed />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
