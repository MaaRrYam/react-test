import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';

import {BackButton, Chat, IconButton, Loading} from '@/components';
import {ChatDetailsScreenProps} from '@/types';
import {Asset, GroupedMessage, UserInterface} from '@/interfaces';
import {styles} from './styles';
import {getUID} from '@/utils/functions';
import ChatsService from '@/services/chats';
import {SendIcon} from '@/assets/icons';
import StorageService from '@/services/Storage';
import FirebaseService from '@/services/Firebase';
import {COLORS} from '@/constants';
import {FlashList} from '@shopify/flash-list';

const ChatScreen: React.FC<ChatDetailsScreenProps> = ({route}) => {
  const [messages, setMessages] = useState<GroupedMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<null | Asset>(null);
  const [isMessageSending, setIsMessageSending] = useState<boolean>(false);

  const {
    params: {name, id, user},
  } = route;

  useEffect(() => {
    const fetchData = async () => {
      const self = (await getUID()) as string;
      const chatAddress = ChatsService.findChatAddress(self, id);
      const unSub = await ChatsService.fetchMessagesRealTime(
        chatAddress,
        setMessages,
      );
      setLoading(false);

      return () => {
        if (unSub) {
          unSub();
        }
      };
    };

    fetchData();
  }, [id]);

  const handleSendMessage = async () => {
    setIsMessageSending(true);
    const sender = (await StorageService.getItem('user')) as UserInterface;
    const senderId = (await getUID()) as string;

    const payload = {
      senderId,
      receiverId: id,
      message,
      sender,
      receiver: user,
      fileUrl: '',
    };
    if (selectedImage) {
      const imageUrl = (await FirebaseService.uploadToStorage(
        selectedImage,
      )) as string;
      payload.fileUrl = imageUrl;
    }

    setMessage('');
    handleResetImage();
    await ChatsService.sendMessage(payload);
    setIsMessageSending(false);
  };

  const handleResetImage = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <Loading />;
  }

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 300,
        maxWidth: 300,
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton style={styles.backButton} />
        {user?.photoUrl ? (
          <FastImage
            source={{
              uri: user?.photoUrl,
              priority: 'high',
              cache: 'immutable',
            }}
            resizeMode="cover"
            style={styles.userImage}
          />
        ) : (
          <Image
            style={styles.userImage}
            source={require('@/assets/images/user.png')}
            resizeMode="cover"
          />
        )}
        <Text style={styles.userName}>{name || 'Some User'}</Text>
        <Text>...</Text>
      </View>

      <View style={styles.chatsContainer}>
        <FlashList
          inverted
          data={messages}
          keyExtractor={(item, index) =>
            item?.id?.toString() || index.toString()
          }
          renderItem={({item}) => (
            <View>
              <View style={styles.date}>
                <View style={styles.dateLine} />
                <Text style={styles.dateText}>{item.date}</Text>
                <View style={styles.dateLine} />
              </View>
              {item.messages.map((messageItem, index) => (
                <Chat key={index} message={messageItem} />
              ))}
            </View>
          )}
          estimatedItemSize={100}
        />
      </View>

      <View style={styles.imageContainer}>
        {selectedImage && (
          <FastImage
            source={{
              uri: selectedImage.uri,
              priority: 'high',
              cache: 'web',
            }}
            resizeMode="cover"
            style={styles.selectedImage}
          />
        )}

        {selectedImage && (
          <TouchableOpacity
            onPress={handleResetImage}
            style={styles.crossButton}>
            <Text style={styles.crossText}>X</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputFieldContainer}>
          <TextInput
            placeholder="Start Typing..."
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />
          {(message || selectedImage?.uri) && (
            <>
              {isMessageSending ? (
                <ActivityIndicator size="small" color={COLORS.primary} />
              ) : (
                <TouchableOpacity onPress={handleSendMessage}>
                  <SendIcon />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
        <IconButton
          imageSource={require('@/assets/icons/image.png')}
          onPress={openImagePicker}
          style={styles.uploadImageButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
