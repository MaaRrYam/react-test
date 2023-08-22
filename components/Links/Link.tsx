import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const Link = ({text, onPress}: {text: string; onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.text,
    borderBottomColor: COLORS.borderGray,
    borderBottomWidth: 1,
    fontSize: FONTS.text,
    textAlign: 'center',
  },
});

export default Link;
