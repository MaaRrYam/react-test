import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {ChatItem, Empty} from '@/components';
import {ChatsInterface} from '@/interfaces';
import {useAppSelector} from '@/hooks/useAppSelector';
import {RootStackParamList} from '@/types';

interface ChatsListProps {
  search: string;
  navigation: StackNavigationProp<RootStackParamList, 'Chats'>;
}

const ChatsList = ({search, navigation}: ChatsListProps) => {
  const [filteredChats, setFilteredChats] = useState<ChatsInterface[]>([]);

  const {chats, isChatsFetched} = useAppSelector(state => state.chats);

  useEffect(() => {
    setFilteredChats(chats);

    if (search) {
      setFilteredChats(
        chats.filter(chat =>
          chat.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setFilteredChats(chats);
    }
  }, [chats, isChatsFetched, search]);

  return (
    <>
      {filteredChats?.length ? (
        <FlatList
          data={filteredChats}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ChatItem item={item} navigation={navigation} />
          )}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default ChatsList;
