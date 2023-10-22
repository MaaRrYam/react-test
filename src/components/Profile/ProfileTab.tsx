import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {NewPost} from '@/components';
import {TabDataInterface} from '@/interfaces';
import {profileTabStyles as styles} from './styles';

const ProfileTab: FC<TabDataInterface> = ({bio, photo}) => {
  const [isNewPostClicked, setIsNewPostClicked] =
    React.useState<boolean>(false);

  const handleOpen = () => {
    setIsNewPostClicked(true);
  };

  const handleClose = () => {
    setIsNewPostClicked(false);
  };
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

          <TouchableOpacity style={styles.searchBar} onPress={handleOpen}>
            <Text style={styles.searchBarText}>Start a Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isNewPostClicked && (
        <NewPost isVisible={isNewPostClicked} onClose={handleClose} />
      )}
    </>
  );
};

export default ProfileTab;
