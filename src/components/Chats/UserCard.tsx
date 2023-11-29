import React, {useState} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import {ChatsInterface, UserInterface} from '@/interfaces';
import {styles} from './styles';
import {RoundedButton} from '../Buttons';
import {formatFirebaseTimestamp} from '@/utils';
import FirebaseService from '@/services/Firebase';
import ChatsService from '@/services/chats';
import {useAppSelector} from '@/hooks/useAppSelector';

const UserCard = ({
  item,
  onClose,
}: {
  item: UserInterface;
  onClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {chats} = useAppSelector(state => state.chats);

  const handleNewMessage = async () => {
    setIsLoading(true);
    const chat: ChatsInterface = {
      id: item.id,
      userId: item.id,
      message: '',
      name: item.name,
      photoUrl: item.photoUrl || require('@/assets/images/user.png'),
      read: true,
      time: formatFirebaseTimestamp(FirebaseService.serverTimestamp(), 'time'),
      user: item,
    };

    const response = await ChatsService.addNewChat(item.id, chat);
    setIsLoading(false);
    if (response) {
      onClose();
    }
  };

  const isAlreadyAdded = chats.find(chat => chat.id === item.id);
  if (isAlreadyAdded) {
    return null;
  }

  return (
    <View style={styles.userItem}>
      <View style={styles.userImage}>
        <FastImage
          resizeMode="cover"
          source={
            item.photoUrl
              ? {
                  uri: item.photoUrl,
                  priority: FastImage.priority.normal,
                  cache: FastImage.cacheControl.immutable,
                }
              : require('@/assets/images/user.png')
          }
          style={styles.userImage}
        />
      </View>
      <View style={styles.userItemContent}>
        <View style={styles.userItemHeader}>
          <Text style={styles.userItemName}>{item.name}</Text>
          <Text style={styles.userItemTagline}>
            {item.tagline || 'Missing Tagline'}
          </Text>
        </View>

        <View>
          <RoundedButton
            text="Message"
            onPress={handleNewMessage}
            isLoading={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

export default UserCard;
