import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';

import {BottomSheet} from '@/components';
import {styles} from './styles';
import useUserManagement from '@/hooks/useUserManagement';

const NewChat = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {user} = useUserManagement();
  const [photos, setPhotos] = useState([]);

  //   _handleButtonPress = () => {
  //     CameraRoll.getPhotos({
  //       first: 20,
  //       assetType: 'Photos',
  //     })
  //       .then(r => {
  //         this.setState({photos: r.edges});
  //       })
  //       .catch(err => {
  //         //Error Loading Images
  //       });
  //   };

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
      <View style={styles.container}>
        <Text style={styles.createPostText}>Create a New Post</Text>

        <View style={styles.authorContainer}>
          <Image
            style={styles.avatar}
            source={
              user?.photoUrl
                ? {
                    uri: user.photoUrl,
                  }
                : require('@/assets/images/user.png')
            }
          />
          <Text style={styles.authorName}>{user?.name}</Text>
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </BottomSheet>
  );
};

export default NewChat;
