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
