import React, {memo, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

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
          <FastImage
            resizeMode="cover"
            source={{
              uri: message.fileUrl,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            style={styles.file}
          />
        )}
        <View style={message.fileUrl ? styles.withFileMessage : null}>
          <Text style={styles.messageText}>{message.message}</Text>
          <Text style={styles.messageTime}>{message.time}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(Chat);
