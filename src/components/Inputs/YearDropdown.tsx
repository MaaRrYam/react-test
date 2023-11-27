import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {COLORS, FONTS} from '@/constants';
import {Animated} from 'react-native';
import {YearDropdownProps} from '@/interfaces';

const YearDropdown: React.FC<YearDropdownProps> = ({
  selectedYear,
  years,
  onYearSelect,
  setFieldTouched,
  name,
  label,
  style,
}) => {
  const [focused, setFocused] = useState(false);
  const [animatedIsFocused] = useState(
    new Animated.Value(selectedYear ? 1 : 0),
  );

  const handleFocus = () => {
    setFocused(true);
    setFieldTouched(name, true);
  };
  const handleBlur = () => {
    if (name && !selectedYear) {
      setFocused(false);
      Animated.timing(animatedIsFocused, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: 'absolute' as 'absolute',
    left: 12,
    top: focused || selectedYear ? 13 : 22,
    fontSize: focused || selectedYear ? 12 : 16,
    color: focused ? COLORS.text : COLORS.text,
  };

  return (
    <View style={[styles.container, style]}>
      <Picker
        selectedValue={selectedYear}
        onValueChange={year => {
          onYearSelect(year);
          handleBlur();
        }}
        style={styles.picker}
        onFocus={handleFocus}
        onBlur={() => {
          setFocused(false);
          handleBlur();
        }}>
        {years.map(year => (
          <Picker.Item key={year} label={year.toString()} value={year} />
        ))}
      </Picker>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingTop: 18,
    position: 'relative',
    width: 156,
  },
  selectedYearText: {
    fontSize: FONTS.bodySmall,
    color: COLORS.black,
    paddingTop: 10,
  },
  picker: {
    color: COLORS.black,
  },
  label: {
    fontSize: 16,
    color: COLORS.text,
  },
});

export default YearDropdown;
