import React, {useEffect} from 'react';
import {View, SafeAreaView, Image, Text, TouchableOpacity} from 'react-native';

import {Header, Feed, NewPost} from '@/components';
import {HomeScreenProps} from '@/types';
import {homeStyles} from '@/styles/home';
import {styles} from './styles';
import useUserManagement from '@/hooks/useUserManagement';
import Cache from '@/cache';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useFocusEffect} from '@react-navigation/native';
import {getUID} from '@/utils/functions';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [isNewPostClicked, setIsNewPostClicked] =
    React.useState<boolean>(false);

  const {user} = useUserManagement();
  const {feed} = useAppSelector(state => state.home);

  const handleOpen = () => {
    setIsNewPostClicked(true);
  };

  const handleClose = () => {
    setIsNewPostClicked(false);
  };

  useFocusEffect(() => {
    return () => {
      (async () => {
        const lastFeedItems = feed?.slice(feed.length - 5);
        await Cache.set('feed', lastFeedItems);
      })();
    };
  });

  useEffect(() => {
    const fetchUID = async () => {
      console.log(await getUID());
    };
    fetchUID();
  }, []);

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

            <TouchableOpacity style={styles.searchBar} onPress={handleOpen}>
              <Text style={styles.searchBarText}>Start a Post</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.feedContainer}>
          <Feed />
        </View>
      </SafeAreaView>
      {isNewPostClicked && (
        <NewPost isVisible={isNewPostClicked} onClose={handleClose} />
      )}
    </View>
  );
};

export default HomeScreen;
