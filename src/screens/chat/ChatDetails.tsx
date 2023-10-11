import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import {BackButton, Chat, IconButton, Loading} from '@/components';
import {ChatDetailsScreenProps} from '@/types';
import {useAppSelector} from '@/hooks/useAppSelector';
import {ChatsInterface, GroupedMessage, UserInterface} from '@/interfaces';
import {styles} from './styles';
import {getUID} from '@/utils/functions';
import ChatsService from '@/services/chats';
import {SendIcon} from '@/assets/icons';
import StorageService from '@/services/Storage';
import FirebaseService from '@/services/Firebase';

const ChatScreen: React.FC<ChatDetailsScreenProps> = ({route}) => {
  const [messages, setMessages] = useState<GroupedMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const {
    params: {name, id},
  } = route;

  const chatHead = useAppSelector(state =>
    state.chats.chats.find(chat => chat.id === id),
  ) as ChatsInterface;

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
    const sender = (await StorageService.getItem('user')) as UserInterface;
    const senderId = (await getUID()) as string;

    if (selectedImage) {
      const imageUrl = await FirebaseService.uploadToStorage(selectedImage);
      console.log(imageUrl, 'IMAGE URL');
    }

    const payload = {
      senderId,
      receiverId: id,
      message,
      sender,
      receiver: chatHead.user,
    };

    setMessage('');
    await ChatsService.sendMessage(payload);
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
        maxHeight: 2000,
        maxWidth: 2000,
      },
      response => {
        if (response.errorCode) {
          console.log('Image picker error: ', response.errorMessage);
        } else {
          if (response.assets && response.assets.length) {
            let imageUri = response.assets[0].uri || '';
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
        <Image
          source={
            chatHead?.user?.photoUrl
              ? {uri: chatHead.user.photoUrl}
              : require('@/assets/images/user.png')
          }
          style={styles.userImage}
        />
        <Text style={styles.userName}>{name || 'Some User'}</Text>
        <Text>...</Text>
      </View>

      <View style={styles.chatsContainer}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={item => item.date}
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
        />
      </View>

      <View style={styles.imageContainer}>
        {selectedImage && (
          <Image source={{uri: selectedImage}} style={styles.selectedImage} />
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
          {message && (
            <TouchableOpacity onPress={handleSendMessage}>
              <SendIcon />
            </TouchableOpacity>
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
