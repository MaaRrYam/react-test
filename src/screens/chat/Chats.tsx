import React, {useState} from 'react';
import {FlatList, SafeAreaView, TextInput, View} from 'react-native';

import {homeStyles} from '@/styles/home';
import {BackButton, ChatItem} from '@/components';
import {ChatsScreenProps} from '@/types';
import {styles} from './styles';
import {NewChat} from '@/assets/icons';

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
  const [search, setSearch] = useState('');

  return (
    <View style={homeStyles.outerContainer}>
      <SafeAreaView style={homeStyles.container}>
        <View style={homeStyles.header}>
          <View style={styles.leftContainer}>
            <BackButton isBgWhite={true} style={styles.backButtonStyles} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              style={styles.searchInputStyles}
            />
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.iconContainer}>
              <NewChat />
            </View>
          </View>
        </View>

        <FlatList
          data={CHATS}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ChatItem item={item} navigation={navigation} />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default Chats;
