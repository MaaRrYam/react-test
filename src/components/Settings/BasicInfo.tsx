import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Input} from '../Inputs';
import {PrimaryButton} from '../Buttons';
import DatePicker from 'react-native-date-picker';
import ProfileService from '@/services/profile';
import ToastService from '@/services/toast';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {updateUserData} from '@/store/features/authSlice';
import PhoneInput from 'react-native-phone-number-input';
import {inputStyles} from '../Inputs/styles';

const BasicInfo = () => {
  const {user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const phoneInput = useRef<PhoneInput>(null);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.recoveryEmail || '');
  const [contactNumber, setContactNumber] = useState(user?.phoneNumber || '');
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateBasicInfo = async () => {
    setLoading(true);
    const payload = {
      id: user.id,
      recoverEmail: email,
      phoneNumber: contactNumber,
      dateOfBirth: dateOfBirth.toDateString(),
      name,
    };

    const response = await ProfileService.updateSettingsBasicInfo(payload);

    if (response) {
      const updatedData = {...user, ...payload};
      dispatch(updateUserData(updatedData));
      ToastService.showSuccess('Info Updated successfully');
    } else {
      ToastService.showError('Something went wrong');
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <View>
        <Input placeholder="Name" onChangeText={setName} value={name} />
        <Input
          placeholder="Recovery Email"
          onChangeText={setEmail}
          value={email}
        />
        <PhoneInput
          ref={phoneInput}
          defaultValue={contactNumber}
          defaultCode="US"
          onChangeFormattedText={text => {
            setContactNumber(text);
          }}
          containerStyle={[inputStyles.fullWidth, styles.phoneNumberField]}
          textContainerStyle={inputStyles.phoneTextContainer}
          countryPickerButtonStyle={inputStyles.phoneCountryPickerButton}
        />
        <Input
          placeholder="Date of Birth"
          onChangeText={() => {}}
          value={dateOfBirth.toLocaleDateString()}
          onPress={() => setOpen(true)}
        />
        <DatePicker
          modal
          open={open}
          date={dateOfBirth}
          maximumDate={new Date()}
          androidVariant="iosClone"
          mode="date"
          onConfirm={date => {
            setOpen(false);
            setDateOfBirth(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      <View style={styles.saveButton}>
        <PrimaryButton
          onPress={handleUpdateBasicInfo}
          title="Save"
          isLoading={loading}
        />
      </View>
    </View>
  );
};

export default BasicInfo;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.67,
    justifyContent: 'space-between',
  },
  phoneNumberField: {marginVertical: 10},
  text: {
    color: 'black',
  },
  saveButton: {},
});
