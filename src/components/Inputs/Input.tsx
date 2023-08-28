import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, DefaultTheme} from 'react-native-paper';
import {BORDER_RADIUS, COLORS} from '../../constants';

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
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: COLORS.text,
      placeholder: COLORS.text,
      primary: COLORS.text,
      accent: COLORS.text,
    },
    roundness: BORDER_RADIUS.general,
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
      outlineColor={COLORS.inputBorder}
      activeOutlineColor={COLORS.inputBorder}
      placeholderTextColor={COLORS.text}
      textColor={COLORS.text}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: COLORS.white,
  },
});

export default Input;
