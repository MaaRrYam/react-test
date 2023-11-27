import React, {useState} from 'react';
import {View, PrimaryButton, Platform} from 'react-native';
import DateTimePicker from 'react-native-date-picker';

const MyDatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (selectedDate: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    setDate(selectedDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <View>
        <PrimaryButton onPress={showDatePickerModal} title="Show Date Picker" />
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          mode="date"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default MyDatePicker;
