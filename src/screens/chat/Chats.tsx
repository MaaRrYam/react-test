import React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';

import {homeStyles} from '@/styles/home';
import {Header, ChatItem} from '@/components';
import {ChatsScreenProps} from '@/types';

const CHATS = [
  {
    id: '1',
    image: '@/assets/images/user.png',
    name: 'Дима',
    time: '17 Jul',
    hasUnreadMessages: true,
    lastMessage: 'Какой-то текст от дима',
  },
  {
    id: '2',
    image: '@/assets/images/user.png',
    name: 'Someone',
    time: '17 Jul',
    hasUnreadMessages: false,
    lastMessage: 'Какой-то текст от дима',
  },
];

const Chats: React.FC<ChatsScreenProps> = ({navigation}) => {
  return (
    <View style={homeStyles.outerContainer}>
      <SafeAreaView style={homeStyles.container}>
        <Header navigation={navigation} />

        <FlatList
          data={CHATS}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ChatItem item={item} />}
        />
      </SafeAreaView>
    </View>
  );
};

export default Chats;
