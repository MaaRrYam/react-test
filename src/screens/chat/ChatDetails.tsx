import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';

import {CHAT_DETAILS} from '@/constants';
import {BackButton, IconButton} from '@/components';
import {ChatDetailsScreenProps} from '@/types';
import {useAppSelector} from '@/hooks/useAppSelector';
import {ChatsInterface} from '@/interfaces';
import {styles} from './styles';

const ChatScreen: React.FC<ChatDetailsScreenProps> = ({route}) => {
  const {
    params: {name, id},
  } = route;

  const chatHead = useAppSelector(state =>
    state.chats.chats.find(chat => chat.id === id),
  ) as ChatsInterface;

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
          data={CHAT_DETAILS}
          keyExtractor={item => item.date}
          renderItem={({item}) => (
            <View>
              <View style={styles.date}>
                <View style={styles.dateLine} />
                <Text style={styles.dateText}>{item.date}</Text>
                <View style={styles.dateLine} />
              </View>
              {item.messages.map((message, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageContainer,
                    message.sender === 'me'
                      ? styles.myMessageContainer
                      : styles.otherMessageContainer,
                  ]}>
                  <View
                    style={
                      message.sender === 'me'
                        ? styles.myMessage
                        : styles.otherMessage
                    }>
                    <Text style={styles.messageText}>{message.message}</Text>
                    <Text style={styles.messageTime}>{message.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Start Typing..." style={styles.input} />
        <IconButton
          imageSource={require('@/assets/icons/image.png')}
          onPress={() => console.log('Upload Image')}
          style={styles.uploadImageButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
