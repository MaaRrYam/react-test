import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {TabDataInterface} from '@/interfaces';
import {profileTabStyles as styles} from './styles';
import {homeStyles} from '@/styles/home';

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
              <Image
                source={
                  photo ? {uri: photo} : require('@/assets/images/user.png')
                }
                style={styles.userImage}
              />

              <TouchableOpacity
                style={homeStyles.searchBar}
                onPress={handleOpen}>
                <Text style={homeStyles.searchBarText}>Start a Post</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </>
  );
};

export default ProfileTab;
