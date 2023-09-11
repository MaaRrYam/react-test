import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {CheckboxProps} from '@/interfaces';

const Checkbox: React.FC<CheckboxProps> = ({
  onPress,
  size = 20,
  style,
  text = 'Checkbox',
  fillColor = 'red',
  unfillColor = '#fff',
  iconStyle = {},
  innerIconStyle = {},
}: CheckboxProps) => {
  return (
    <>
      <BouncyCheckbox
        size={size}
        fillColor={fillColor}
        unfillColor={unfillColor}
        text={text}
        iconStyle={iconStyle}
        innerIconStyle={innerIconStyle}
        style={style}
        onPress={(isChecked: boolean) => {
          onPress(isChecked);
        }}
      />
    </>
  );
};

export default Checkbox;
