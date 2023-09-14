import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FONTS, COLORS} from '@/constants';

interface Chat {
  id: string;
  image: string;
  name: string;
  time: string;
  hasUnreadMessages: boolean;
  lastMessage: string;
}

const ChatItem = ({item}: {item: Chat}) => {
  return (
    <TouchableOpacity>
      <View style={styles.chatItem}>
        <View style={styles.chatItemImage}>
          <Image
            source={require('@/assets/images/user.png')}
            style={styles.chatItemImage}
          />
        </View>
        <View style={styles.chatItemContent}>
          <View style={styles.chatItemHeader}>
            <Text style={styles.chatItemName}>{item.name}</Text>
            <Text style={styles.chatItemTime}>{item.time}</Text>
          </View>
          <View style={styles.chatItemMessage}>
            <Text style={styles.chatItemLastMessage}>{item.lastMessage}</Text>
            {item.hasUnreadMessages && (
              <View style={styles.chatItemUnreadMessage} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  chatItemImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 8,
  },
  chatItemContent: {
    marginLeft: 10,
    flex: 1,
  },

  chatItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  chatItemName: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  chatItemTime: {
    color: COLORS.text,
    fontSize: FONTS.bodySmall,
  },
  chatItemMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatItemLastMessage: {
    color: COLORS.text,
    fontSize: FONTS.bodyRegular,
  },
  chatItemUnreadMessage: {
    width: 12,
    height: 12,
    borderRadius: 1000,
    backgroundColor: COLORS.primary,
  },
});

export default ChatItem;
