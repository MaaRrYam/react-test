import React from 'react';
import {View, SafeAreaView, Image, TextInput} from 'react-native';

import {Header, Feed} from '@/components';
import {HomeScreenProps} from '@/types';
import {homeStyles} from '@/styles/home';
import {styles} from './styles';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={homeStyles.outerContainer}>
      <SafeAreaView style={homeStyles.container}>
        <View>
          <Header navigation={navigation} />
          <View style={homeStyles.subheader}>
            <Image
              source={require('@/assets/images/user.png')}
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
