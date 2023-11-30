import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {CheckMark} from '@/assets/icons';
import {BORDER_RADIUS, BORDER_WIDTH, COLORS, FONTS} from '@/constants';
import {CheckboxProps} from '@/interfaces';

const Checkbox: React.FC<CheckboxProps> = ({
  onPress,
  isChecked = false,
  size = 24,
  color = COLORS.white,
  style,
  text,
  fillColor = COLORS.primary,
  unfillColor = COLORS.lightGrayBackground,
  iconStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.checkboxContainer, style]}>
      <View
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderColor: color,
            backgroundColor: isChecked ? fillColor : unfillColor,
          },
          iconStyle,
        ]}>
        {isChecked && <CheckMark />}
      </View>
      <Text style={styles.checkboxValues}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: BORDER_WIDTH.general,
    borderRadius: BORDER_RADIUS.general,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    position: 'absolute',
  },
  checkboxValues: {
    fontSize: FONTS.text,
    fontWeight: 'normal',
    color: COLORS.black,
  },
});
export default Checkbox;
