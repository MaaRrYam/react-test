import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {launchImageLibrary} from 'react-native-image-picker';

import {BottomSheet, BottomSheetInput, PrimaryButton} from '@/components';
import {styles} from './styles';
import {Asset, ImageInterface} from '@/interfaces';
import FirebaseService from '@/services/Firebase';
import {getUID} from '@/utils/functions';
import HomeService from '@/services/home';
import ToastService from '@/services/toast';
import {COLORS} from '@/constants';
import {hasAndroidPermission} from '@/utils';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {addPostToFeed, addPostToProfileFeed} from '@/store/features/homeSlice';
import {useAppSelector} from '@/hooks/useAppSelector';

const NewPost = ({
  isVisible,
  onClose,
  isFromFeed,
}: {
  isVisible: boolean;
  onClose: () => void;
  isFromFeed?: boolean;
}) => {
  const {user} = useAppSelector(state => state.auth);
  const [photos, setPhotos] = useState<ImageInterface[]>([
    {
      filename: null,
      filepath: null,
      extension: null,
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png?20220519031949',
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
  const dispatch = useAppDispatch();

  const openImagePicker = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 500,
        maxWidth: 500,
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
  }, []);

  const handleButtonPress = useCallback(async () => {
    if (Platform.OS === 'android') {
      const hasPermissions = await hasAndroidPermission();
      if (!hasPermissions) {
        return;
      }
    }

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
  }, []);

  useEffect(() => {
    handleButtonPress();
  }, [handleButtonPress]);

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

    const postId = FirebaseService.generateUniqueId();
    const payload = {
      id: postId,
      creationTime: FirebaseService.serverTimestamp(),
      hashtag: 'post',
      type: imageUrl ? 'Media' : 'Text',
      text,
      authorId: UID,
      media: imageUrl,
      mediaType: imageUrl ? 'image' : null,
      editedTime: FirebaseService.serverTimestamp(),
      edited: false,
    };

    const response = await HomeService.createPost(payload);
    if (response) {
      setText('');
      setSelectedImage(null);
      if (isFromFeed) {
        dispatch(
          addPostToFeed({
            ...payload,
            author: user,
            _id: postId,
            feedType: 'post',
            postLikes: [],
            postDislikes: [],
            tags: [],
          }),
        );
      } else {
        dispatch(
          addPostToProfileFeed({
            ...payload,
            author: user,
            _id: postId,
            feedType: 'post',
            postLikes: [],
            postDislikes: [],
            tags: [],
          }),
        );
      }
      ToastService.showSuccess('Post created successfully');
    } else {
      ToastService.showError('Something went wrong');
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      snapPoints={['20%', '80%']}
      onClose={onClose}>
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <ScrollView>
          <Text style={styles.createPostText}>Create a New Post</Text>

          <View style={styles.authorContainer}>
            {user?.photoUrl ? (
              <FastImage
                style={styles.avatar}
                resizeMode="cover"
                source={{
                  uri: user?.photoUrl,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
              />
            ) : (
              <Image
                style={styles.avatar}
                source={require('@/assets/images/user.png')}
                resizeMode="cover"
              />
            )}
            <Text style={styles.authorName}>{user?.name}</Text>
          </View>

          <View style={styles.postContent}>
            <BottomSheetInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="What do you want to post today?"
              placeholderTextColor={COLORS.black}
              returnKeyType="done"
            />

            {selectedImage && (
              <Image
                style={styles.selectedImage}
                source={{
                  uri: selectedImage.uri,
                }}
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
        </ScrollView>

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
                    source={{
                      uri: item.uri,
                    }}
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
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

export default NewPost;
