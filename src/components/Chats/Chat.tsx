import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import {styles} from '@/screens/chat/styles';
import {getUID} from '@/utils/functions';

const Chat = ({
  message,
}: {
  message: {
    message: string;
    sender: string;
    time: string;
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
        style={
          message.sender === ourId ? styles.myMessage : styles.otherMessage
        }>
        <Text style={styles.messageText}>{message.message}</Text>
        <Text style={styles.messageTime}>{message.time}</Text>
      </View>
    </View>
  );
};

export default Chat;
