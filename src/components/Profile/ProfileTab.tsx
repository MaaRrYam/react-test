import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {TabDataInterface} from '@/interfaces';
import {profileTabStyles as styles} from './styles';

const ProfileTab: FC<TabDataInterface> = ({
  bio,
  photo,
  id,
  loggedInID,
  handleOpen,
}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.text}>{bio}</Text>

        {id === '' ||
          (id === loggedInID && (
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

              <TouchableOpacity style={styles.searchBar} onPress={handleOpen}>
                <Text style={styles.searchBarText}>Start a Post</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </>
  );
};

export default ProfileTab;
