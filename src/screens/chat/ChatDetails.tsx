import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';

import {BackButton, Chat, IconButton, Loading} from '@/components';
import {ChatDetailsScreenProps} from '@/types';
import {useAppSelector} from '@/hooks/useAppSelector';
import {ChatsInterface, GroupedMessage} from '@/interfaces';
import {styles} from './styles';
import {getUID} from '@/utils/functions';
import ChatsService from '@/services/chats';

const ChatScreen: React.FC<ChatDetailsScreenProps> = ({route}) => {
  const [messages, setMessages] = useState<GroupedMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      const unsub = await ChatsService.fetchMessagesRealTime(
        chatAddress,
        setMessages,
      );
      setLoading(false);

      return () => {
        if (unsub) {
          unsub();
        }
      };
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

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
          data={messages}
          keyExtractor={item => item.date}
          renderItem={({item}) => (
            <View>
              <View style={styles.date}>
                <View style={styles.dateLine} />
                <Text style={styles.dateText}>{item.date}</Text>
                <View style={styles.dateLine} />
              </View>
              {item.messages.map((message, index) => (
                <Chat key={index} message={message} />
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
