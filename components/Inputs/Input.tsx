import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Animated} from 'react-native';

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
  const translateY = new Animated.Value(value || isFocused ? 2 : 20);
  const translateX = new Animated.Value(value || isFocused ? 12 : 10);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 10,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 20,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const labelStyle = {
    transform: [{translateY}, {translateX}],
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.Text style={[styles.label, labelStyle]}>
        {placeholder}
      </Animated.Text>
      <TextInput
        placeholder={''}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    position: 'absolute',
    left: 10,
    color: '#999',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
});

export default Input;
