import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '@/constants';
import {RoundedButtonProps} from '@/interfaces';

const RoundedButton = ({onPress, text, style}: RoundedButtonProps) => {
  return (
    <TouchableOpacity style={[styles.buttonStyles, style]} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightGrayBackground,
    color: COLORS.black,
    borderRadius: 20,
  },
});

export default RoundedButton;
