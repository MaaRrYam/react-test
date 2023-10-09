import { CheckMark } from '@/assets/icons';
import {COLORS} from '@/constants';
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CheckboxProps {
  onPress: () => void;
  isChecked?: boolean;
  size?: number;
  color?: string;
  style?: any;
  text?: string;
  fillColor?: string;
  unfillColor?: string;
  iconStyle?: any;
  innerIconStyle?: any;
}

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
  innerIconStyle,
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

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    position: 'absolute',
  },
  checkText: {
    marginLeft: 8,
  },
});
export default Checkbox;
