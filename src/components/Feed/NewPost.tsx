import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import {BottomSheet, Button} from '@/components';
import {styles} from './styles';
import useUserManagement from '@/hooks/useUserManagement';

interface ImageInterface {
  filename: string | null;
  filepath: string | null;
  extension: string | null;
  uri: string;
  height: number;
  width: number;
  fileSize: number | null;
  playableDuration: number;
  orientation: number | null;
}

const NewChat = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {user} = useUserManagement();
  const [photos, setPhotos] = useState<ImageInterface[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageInterface | null>(
    null,
  );

  const handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        const images = r.edges.map(edge => edge.node.image);
        setPhotos(images);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleButtonPress();
  }, []);

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      snapPoints={['20%', '70%']}>
      <View style={styles.container}>
        <View>
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

          <View style={styles.postContent}>
            <TextInput
              style={styles.input}
              placeholder="What do you want to post today?"
            />

            {selectedImage && (
              <Image
                style={styles.selectedImage}
                source={{uri: selectedImage.uri}}
                resizeMode="cover"
              />
            )}
            {selectedImage && (
              <TouchableOpacity
                onPress={() => setSelectedImage(null)}
                style={styles.crossButton}>
                <Text style={styles.crossText}>X</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View>
          <View style={styles.imageListContainer}>
            <FlatList
              data={photos}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => setSelectedImage(item)}>
                  <Image
                    style={styles.image}
                    source={{uri: item.uri}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
            />
          </View>
          <Button title="Post" onPress={() => console.log('Im clicked')} />
        </View>
      </View>
    </BottomSheet>
  );
};

export default NewChat;
