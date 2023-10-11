import {CheckMark} from '@/assets/icons';
import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  COLORS,
  FONTS,
  MARGINS,
  PADDING,
} from '@/constants';
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
    marginLeft: MARGINS.general,
    marginTop: MARGINS.general,
  },
  checkIcon: {
    position: 'absolute',
  },
  checkboxValues: {
    fontSize: FONTS.text,
    fontWeight: 'normal',
    paddingLeft: PADDING.general,
    marginTop: MARGINS.general,
    color: COLORS.black,
  },
});
export default Checkbox;
