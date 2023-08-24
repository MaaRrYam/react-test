import {ButtonProps} from 'interfaces';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  backgroundColor = '#1918FF',
  textColor = 'white',
  borderWidth = 0,
  borderColor = 'transparent',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor},
        {borderWidth},
        {borderColor},
        style,
      ]}
      onPress={onPress}>
      <Text style={[styles.buttonText, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
