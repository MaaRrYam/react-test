import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';

import {styles} from '@/screens/chat/styles';
import {getUID} from '@/utils/functions';

const Chat = ({
  message,
}: {
  message: {
    message: string;
    sender: string;
    time: string;
    fileUrl: string;
  };
}) => {
  const [ourId, setOurId] = useState('');

  useEffect(() => {
    (async () => {
      const uid = (await getUID()) as string;
      setOurId(uid);
    })();
  }, []);

  return (
    <View
      style={[
        styles.messageContainer,
        message.sender === ourId
          ? styles.myMessageContainer
          : styles.otherMessageContainer,
      ]}>
      <View
        style={[
          message.sender === ourId
            ? [
                styles.myMessage,
                message.fileUrl ? styles.myMessageWithFile : null,
              ]
            : styles.otherMessage,
        ]}>
        {message.fileUrl && (
          <Image source={{uri: message.fileUrl}} style={styles.file} />
        )}
        <View style={message.fileUrl ? styles.withFileMessage : null}>
          <Text style={styles.messageText}>{message.message}</Text>
          <Text style={styles.messageTime}>{message.time}</Text>
        </View>
      </View>
    </View>
  );
};

export default Chat;
