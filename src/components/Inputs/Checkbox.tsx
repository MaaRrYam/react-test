import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {CheckboxProps} from '@/interfaces';
import {COLORS} from '@/constants';

const Checkbox: React.FC<CheckboxProps> = ({
  onPress,
  size = 24,
  style = {},
  text,
  fillColor = COLORS.primary,
  unfillColor = COLORS.lightBackground,
  iconStyle = {},
  innerIconStyle = {},
  isChecked = false,
}) => {
  
  const toggleCheckbox = () => {
    onPress(!isChecked);
  };

  return (
    <TouchableOpacity
      onPress={toggleCheckbox}
      style={[
        styles.checkbox,
        style,
        {
          width: size,
          height: size,
          backgroundColor: isChecked ? fillColor : unfillColor,
        },
      ]}>
      <Text style={[styles.checkmark, iconStyle, innerIconStyle]}>✔</Text>
      {text && <Text style={styles.label}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 18,
    color: 'white',
  },
  label: {
    marginLeft: 8,
  },
});

export default Checkbox;
