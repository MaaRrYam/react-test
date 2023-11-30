import React, {useEffect, useState} from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';

import {homeStyles} from '@/styles/home';
import {BackButton, ChatsList, Loading, NewChat} from '@/components';
import {ChatsScreenProps} from '@/types';
import {styles} from './styles';
import {NewChatIcon} from '@/assets/icons';
import ChatsService from '@/services/chats';
import {ChatsInterface} from '@/interfaces';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {setChatsToStore} from '@/store/features/chatsSlice';
import {COLORS} from '@/constants';

const Chats: React.FC<ChatsScreenProps> = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [isNewChatClicked, setIsNewChatClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<ChatsInterface[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const unSub = await ChatsService.getAllChatsRealtime(setChats);
      setLoading(false);

      return () => {
        if (unSub) {
          unSub();
        }
      };
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(setChatsToStore(chats));
  }, [chats, dispatch]);

  if (loading) {
    return <Loading />;
  }

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
              placeholderTextColor={COLORS.black}
            />
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setIsNewChatClicked(true)}>
              <NewChatIcon />
            </TouchableOpacity>
          </View>
        </View>

        <ChatsList search={search} navigation={navigation} />
      </SafeAreaView>
      {isNewChatClicked && (
        <NewChat
          isVisible={isNewChatClicked}
          onClose={() => setIsNewChatClicked(false)}
        />
      )}
    </View>
  );
};

export default Chats;
