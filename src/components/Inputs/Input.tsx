import React, {useState, useEffect, useCallback, FC} from 'react';
import {View, TextInput, Animated, Text} from 'react-native';
import {COLORS} from '@/constants';
import {InputProps} from '@/interfaces';
import {inputStyles} from './styles';

const Input: FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
  secureTextEntry,
  keyboardType,
  error,
  touched,
  name,
  setFieldTouched,
  disabled,
}) => {
  const [, setIsFocused] = useState(false);
  const [animatedIsFocused] = useState(new Animated.Value(value ? 1 : 0));

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedIsFocused]);

  const handleBlur = () => {
    if (name && setFieldTouched) {
      setFieldTouched(name, true);
    }
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
    borderColor: touched && error ? 'red' : COLORS.border,
  };
  useEffect(() => {
    if (value) {
      handleFocus();
    }
  }, [value, handleFocus]);

  return (
    <View>
      <View style={[inputStyles.container, style, inputContainerStyle]}>
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
        <TextInput
          value={value}
          onChangeText={handleTextChange}
          style={inputStyles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={!disabled}
        />
      </View>
      {touched && error && <Text style={inputStyles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
