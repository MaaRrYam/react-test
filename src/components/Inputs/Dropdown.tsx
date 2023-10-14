import {ArrowDown} from '@/assets/icons';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ScrollView,
} from 'react-native';

interface DropdownProps {
  label?: string;
  options: string[];
  style: StyleProp<ViewStyle>;
  startingOption: string;
  selectedOption?: string | null;
  onOptionSelect?: (option: string) => void;
  error?: string;
  touched?: boolean;
  onBlur?: Function;
  setFieldTouched?: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  startingOption,
  options,
  style,
  onOptionSelect,
  selectedOption,
  error,
  touched,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const setSelectedOption = (option: string) => {
    setIsOpen(false);
    onOptionSelect?.(option);
  };

  return (
    <View style={[style, {flex: 1}]}>
      <TouchableOpacity onPress={toggleDropdown}>
        <View style={styles.dropdownHeader}>
          <Text style={{color: 'black'}}>
            {selectedOption || startingOption}
          </Text>
          <View>
            <ArrowDown />
          </View>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownListContainer}>
          <ScrollView style={styles.dropdownList} scrollEnabled>
            {options.map(option => (
              <ScrollView scrollEnabled>
                <TouchableOpacity
                  key={option}
                  onPress={() => setSelectedOption(option)}>
                  <Text style={{color: 'black'}}>{option}</Text>
                </TouchableOpacity>
              </ScrollView>
            ))}
          </ScrollView>
        </View>
      )}
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownHeader: {
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dropdownListContainer: {
    flex: 1, // Make the container flex to enable scrolling
    borderWidth: 1,
    borderColor: '#e4e4e4',
    marginTop: -10,
    borderTopWidth: 0,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  dropdownList: {
    padding: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default Dropdown;
