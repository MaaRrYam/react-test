import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const Link = ({
  text,
  onPress,
  style,
}: {
  text: string;
  onPress: () => void;
  style?: any;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, style]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.text,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    fontSize: FONTS.text,
    textAlign: 'center',
  },
});

export default Link;
