import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {COLORS} from '../../constants';

const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  style,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: any;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputTheme = {
    colors: {
      text: COLORS.text,
      placeholder: COLORS.text,
      primary: isFocused ? COLORS.primary : '#ccc',
    },
  };

  return (
    <TextInput
      label={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      mode="outlined"
      style={[styles.container, style]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      theme={inputTheme}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
});

export default Input;
