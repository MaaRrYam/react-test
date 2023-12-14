import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {TabDataInterface} from '@/interfaces';
import {profileTabStyles as styles} from './styles';
import {homeStyles} from '@/styles/home';
import useUserManagement from '@/hooks/useUserManagement';

const ProfileTab: FC<TabDataInterface> = ({bio, photo, id, handleOpen}) => {
  const {user} = useUserManagement();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.text}>{bio || 'User has not added anything'}</Text>

        {id === user?.id && (
          <View style={styles.subheader}>
            {photo ? (
              <FastImage
                source={{
                  uri: photo,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.userImage}
              />
            ) : (
              <Image
                style={styles.userImage}
                source={require('@/assets/images/user.png')}
                resizeMode="cover"
              />
            )}

            <TouchableOpacity style={homeStyles.searchBar} onPress={handleOpen}>
              <Text style={homeStyles.searchBarText}>Start a Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

export default ProfileTab;
