import {CheckMark} from '@/assets/icons';
import {COLORS} from '@/constants';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {checkBoxStyles as styles} from '@/components/Inputs/styles';
import {CheckboxProps} from '@/interfaces';

const Checkbox: React.FC<CheckboxProps> = ({
  onPress,
  isChecked = false,
  size = 24,
  color = COLORS.white,
  style,
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
    </TouchableOpacity>
  );
};

export default Checkbox;
