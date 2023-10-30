import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {launchImageLibrary} from 'react-native-image-picker';

import {BottomSheet, PrimaryButton} from '@/components';
import {styles} from './styles';
import useUserManagement from '@/hooks/useUserManagement';
import {Asset, ImageInterface} from '@/interfaces';
import FirebaseService from '@/services/Firebase';
import {getUID} from '@/utils/functions';
import HomeService from '@/services/home';
import ToastService from '@/services/toast';
import {COLORS} from '@/constants';

const NewPost = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {user} = useUserManagement();
  const [photos, setPhotos] = useState<ImageInterface[]>([
    {
      filename: null,
      filepath: null,
      extension: null,
      uri: 'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=',
      height: 0,
      width: 0,
      fileSize: null,
      playableDuration: 0,
      orientation: null,
    },
  ]);
  const [selectedImage, setSelectedImage] = useState<
    ImageInterface | Asset | null
  >(null);
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      response => {
        if (response.errorCode) {
          console.log('Image picker error: ', response.errorMessage);
        } else {
          if (response.assets && response.assets.length) {
            let imageUri = response.assets[0];
            setSelectedImage(imageUri);
          }
        }
      },
    );
  };

  const handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        const images = r.edges.map(edge => edge.node.image);
        setPhotos(prev => [...prev, ...images]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      handleButtonPress();
    }
  }, []);

  const handleImagePress = (image: ImageInterface) => {
    if (!image.fileSize) {
      openImagePicker();
      return;
    }
    setSelectedImage(image);
  };

  const handlePost = async () => {
    setIsLoading(true);
    const UID = (await getUID()) as string;

    let imageUrl = '';
    if (selectedImage?.uri) {
      imageUrl = (await FirebaseService.uploadToStorage(
        selectedImage,
      )) as string;
    }

    const payload = {
      id: FirebaseService.generateUniqueId(),
      authorId: UID,
      media: imageUrl,
      mediaType: imageUrl ? 'image' : null,
      type: imageUrl ? 'Media' : 'Text',
      text,
      hashtag: 'post',
      creationTime: FirebaseService.serverTimestamp(),
      edited: false,
      editedTime: FirebaseService.serverTimestamp(),
    };

    const response = await HomeService.createPost(payload);
    setIsLoading(false);
    setText('');
    setSelectedImage(null);
    if (response) {
      ToastService.showSuccess('Post created successfully');
    } else {
      ToastService.showError('Something went wrong');
    }
    onClose();
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      snapPoints={['20%', '90%']}>
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
              value={text}
              onChangeText={setText}
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
                <TouchableOpacity onPress={() => handleImagePress(item)}>
                  <Image
                    style={styles.image}
                    source={{uri: item.uri}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
            />
          </View>
          <PrimaryButton
            disabled={!text}
            title="Post"
            isLoading={isLoading}
            activityIndicatorColor={COLORS.white}
            onPress={handlePost}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default NewPost;
