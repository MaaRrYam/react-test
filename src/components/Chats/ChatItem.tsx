import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import {RootStackParamList} from '@/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {ChatsInterface} from '@/interfaces';
import {styles} from './styles';

const ChatItem = ({
  item,
  navigation,
}: {
  item: ChatsInterface;
  navigation: StackNavigationProp<RootStackParamList, 'Chats'>;
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatDetails', {
          id: item.userId,
          name: item.user?.name,
          user: item.user,
        })
      }>
      <View style={styles.chatItem}>
        <View style={styles.chatItemImage}>
          {item?.user?.photoUrl ? (
            <FastImage
              resizeMode="cover"
              source={{
                uri: item.user?.photoUrl,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
              style={styles.chatItemImage}
            />
          ) : (
            <Image
              source={require('@/assets/images/user.png')}
              style={styles.chatItemImage}
            />
          )}
        </View>
        <View style={styles.chatItemContent}>
          <View style={styles.chatItemHeader}>
            <Text style={styles.chatItemName}>{item.user?.name}</Text>
            <Text style={styles.chatItemTime}>{`${item.time}`}</Text>
          </View>
          <View style={styles.chatItemMessage}>
            <Text style={styles.chatItemLastMessage}>
              {item.message.slice(0, 50) || 'No recent message'}
            </Text>
            {item.read === false && (
              <View style={styles.chatItemUnreadMessage} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
