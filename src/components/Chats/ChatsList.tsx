import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlashList} from '@shopify/flash-list';

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
        <FlashList
          data={filteredChats}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({item}) => (
            <ChatItem item={item} navigation={navigation} />
          )}
          estimatedItemSize={30}
        />
      ) : (
        <Empty text="Chats" />
      )}
    </>
  );
};

export default ChatsList;
