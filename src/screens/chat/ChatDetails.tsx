import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import {COLORS, CHAT_DETAILS, FONTS} from '@/constants';
import {BackButton, IconButton} from '@/components';
import {ChatDetailsScreenProps} from '@/types';

const ChatScreen: React.FC<ChatDetailsScreenProps> = ({route}) => {
  const {
    params: {name},
  } = route;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton style={styles.backButton} />
        <Image
          source={require('@/assets/images/user.png')}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{name || 'Some User'}</Text>
        <Text>...</Text>
      </View>

      <View style={styles.chatsContainer}>
        <FlatList
          data={CHAT_DETAILS}
          keyExtractor={item => item.date}
          renderItem={({item}) => (
            <View>
              <View style={styles.date}>
                <View style={styles.dateLine} />
                <Text style={styles.dateText}>{item.date}</Text>
                <View style={styles.dateLine} />
              </View>
              {item.messages.map((message, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageContainer,
                    message.sender === 'me'
                      ? styles.myMessageContainer
                      : styles.otherMessageContainer,
                  ]}>
                  <View
                    style={
                      message.sender === 'me'
                        ? styles.myMessage
                        : styles.otherMessage
                    }>
                    <Text style={styles.messageText}>{message.message}</Text>
                    <Text style={styles.messageTime}>{message.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Start Typing..." style={styles.input} />
        <IconButton
          imageSource={require('@/assets/icons/image.png')}
          onPress={() => console.log('Upload Image')}
          style={styles.uploadImageButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    padding: 10,
  },
  backButton: {
    borderWidth: 0,
  },
  userImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 8,
  },
  userName: {
    flex: 1,
    fontSize: 18,
  },
  chatsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 10,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
    marginRight: 10,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.text,
    marginRight: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  myMessageContainer: {
    flexDirection: 'row-reverse',
  },
  otherMessageContainer: {
    flexDirection: 'row',
  },
  myMessage: {
    backgroundColor: COLORS.lightBlueBackground,
    padding: 20,
    borderRadius: 10,
    width: '70%',
  },
  otherMessage: {
    backgroundColor: COLORS.lightGrayBackground,
    padding: 20,
    borderRadius: 10,
    width: '70%',
  },
  messageText: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
  },
  messageTime: {
    fontSize: FONTS.bodyRegular,
    alignSelf: 'flex-end',
    marginTop: 5,
    color: COLORS.black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    borderRadius: 20,
    padding: 15,
  },
  uploadImageButton: {
    width: 40,
    height: 40,
    marginLeft: 10,
    backgroundColor: COLORS.lightGrayBackground,
    padding: 20,
  },
});

export default ChatScreen;
