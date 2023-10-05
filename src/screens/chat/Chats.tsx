import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';

import {homeStyles} from '@/styles/home';
import {BackButton, ChatsList, Loading, NewChat} from '@/components';
import {ChatsScreenProps} from '@/types';
import {styles} from './styles';
import {NewChatIcon} from '@/assets/icons';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {getAllChats} from '@/store/features/chatsSlice';

const Chats: React.FC<ChatsScreenProps> = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [isNewChatClicked, setIsNewChatClicked] = useState(false);

  const {isChatsFetched, isChatsFirstRequest} = useAppSelector(
    state => state.chats,
  );
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    if (!isChatsFetched) {
      dispatch(getAllChats());
    }
  }, [dispatch, isChatsFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData, isChatsFetched]);

  if (isChatsFirstRequest) {
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
