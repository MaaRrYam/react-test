import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Animated, Text} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {InputProps} from 'interfaces';

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
  secureTextEntry,
  keyboardType,
  error,
  touched,
}) => {
  const [, setIsFocused] = useState(false);
  const [animatedIsFocused] = useState(new Animated.Value(value ? 1 : 0));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      Animated.timing(animatedIsFocused, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleTextChange = (text: string) => {
    onChangeText(text);
  };

  const labelStyle = {
    position: 'absolute' as 'absolute',
    left: 12,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.text, COLORS.text],
    }),
  };

  const inputContainerStyle = {
    borderColor: error ? 'red' : COLORS.border,
  };

  return (
    <View>
      <View style={[styles.container, style, inputContainerStyle]}>
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
        <TextInput
          value={value}
          onChangeText={handleTextChange}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
      {touched && error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    position: 'relative',
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  error: {
    fontSize: FONTS.bodySmall,
    color: 'red',
    marginTop: -10,
    marginLeft: 12,
  },
});

export default Input;
