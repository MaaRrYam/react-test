import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from '@/screens/home/styles';
import {homeStyles} from '@/styles/home';
import useUserManagement from '@/hooks/useUserManagement';

const FeedHeader = ({handleOpen}: {handleOpen: () => void}) => {
  const {user} = useUserManagement();
  return (
    <View style={homeStyles.feedHeaderContainer}>
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

        <TouchableOpacity style={homeStyles.searchBar} onPress={handleOpen}>
          <Text style={homeStyles.searchBarText}>Start a Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedHeader;
