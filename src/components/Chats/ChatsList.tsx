import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {ChatItem, Empty} from '@/components';
import {ChatsInterface} from '@/interfaces';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {refetchChats} from '@/store/features/chatsSlice';
import {RootStackParamList} from '@/types';

interface ChatsListProps {
  search: string;
  navigation: StackNavigationProp<RootStackParamList, 'Chats'>;
}

const ChatsList = ({search, navigation}: ChatsListProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filteredChats, setFilteredChats] = useState<ChatsInterface[]>([]);

  const {chats, isChatsFetched} = useAppSelector(state => state.chats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFilteredChats(chats);

    if (isChatsFetched) {
      setIsRefreshing(false);
    }

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

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(refetchChats());
  };

  return (
    <>
      {filteredChats.length ? (
        <FlatList
          data={filteredChats}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ChatItem item={item} navigation={navigation} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default ChatsList;
