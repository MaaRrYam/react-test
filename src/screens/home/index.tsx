import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Header, Feed, NewPost} from '@/components';
import {HomeScreenProps} from '@/types';
import {homeStyles} from '@/styles/home';
import {styles} from './styles';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {refreshFeed, setFeedFetchedToFalse} from '@/store/features/homeSlice';
import useUserManagement from '@/hooks/useUserManagement';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [isNewPostClicked, setIsNewPostClicked] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const {user} = useUserManagement();
  const {isRefreshing} = useAppSelector(state => state.home);

  const handleRefresh = () => {
    dispatch(refreshFeed());
    dispatch(setFeedFetchedToFalse());
  };

  const handleOpen = () => {
    setIsNewPostClicked(true);
  };

  const handleClose = () => {
    setIsNewPostClicked(false);
  };

  return (
    <View style={homeStyles.outerContainer}>
      <SafeAreaView style={homeStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={homeStyles.container}>
          <Header navigation={navigation} setJobsFilterBottomSheet={() => {}} />

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }>
            <View style={homeStyles.subheader}>
              {user?.photoUrl ? (
                <FastImage
                  source={{
                    uri: user.photoUrl,
                    priority: 'high',
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={styles.userImage}
                />
              ) : (
                <Image
                  source={require('@/assets/images/user.png')}
                  style={styles.userImage}
                  resizeMode="cover"
                />
              )}

              <TouchableOpacity
                style={homeStyles.searchBar}
                onPress={handleOpen}>
                <Text style={homeStyles.searchBarText}>Start a Post</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.feedContainer}>
              <Feed />
            </View>
          </ScrollView>
          {isNewPostClicked && (
            <NewPost isVisible={isNewPostClicked} onClose={handleClose} />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
