import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Dimensions,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import {ArrowDown} from '@/assets/icons';
import {COLORS, FONTS} from '@/constants';
interface DropdownProps {
  label?: string;
  options: string[];
  style?: StyleProp<ViewStyle>;
  selectedOption?: string | null;
  onOptionSelect: (option: string) => void;
  error?: string;
  touched?: boolean;
  onBlur?: Function;
  setFieldTouched?: any;
  setFieldValue?: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  style,
  onOptionSelect,
  selectedOption,
  error,
  touched,
}) => {
  const [value, setValue] = useState(selectedOption);

  const setSelectedOption = (option: string) => {
    setValue(option);
    onOptionSelect(option);
  };

  return (
    <View style={[style, styles.container]}>
      <SelectDropdown
        data={options}
        onSelect={selectedItem => {
          setSelectedOption(selectedItem);
        }}
        buttonTextAfterSelection={selectedItem => selectedItem}
        rowTextForSelection={item => item}
        buttonStyle={styles.dropdownStyle}
        buttonTextStyle={styles.dropdownText}
        renderDropdownIcon={() => (
          <View>
            <ArrowDown />
          </View>
        )}
        dropdownIconPosition="right"
        defaultValue={value}
      />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  dropdownStyle: {
    height: 50,
    borderRadius: 10,
    borderColor: COLORS.border,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    width: Dimensions.get('window').width - 40,
    textAlign: 'left',
  },
  dropdownText: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
    textAlign: 'left',
  },
});

export default Dropdown;
