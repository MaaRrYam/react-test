import React, {FC} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import {COLORS} from '@/constants';
import {TabDataInterface} from '@/interfaces';
import {profileTabStyles as styles} from './styles';
const ProfileTab: FC<TabDataInterface> = ({bio, photo}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>About</Text>
        <Text style={styles.text}>{bio}</Text>

        <View style={styles.subheader}>
          <Image
            source={photo ? {uri: photo} : require('@/assets/images/user.png')}
            style={styles.userImage}
          />

          <TextInput
            style={styles.searchBar}
            placeholder="Start a Post"
            editable={false}
            placeholderTextColor={COLORS.black}
          />
        </View>
      </View>
    </>
  );
};

export default ProfileTab;
