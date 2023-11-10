import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Input} from '../Inputs';
import {PrimaryButton} from '../Buttons';
import {getScreenDimensions, getUID} from '@/utils/functions';
import DatePicker from 'react-native-date-picker';
import {SettingBasicInfoUpdateInterface} from '@/interfaces';
// import {Timestamp} from 'firebase/firestore';
import ProfileService from '@/services/profile';
import ToastService from '@/services/toast';
import useUserManagement from '@/hooks/useUserManagement';

const {height} = getScreenDimensions();

const BasicInfo = () => {
  const {user} = useUserManagement();
  const [email, setEmail] = useState(user?.recoveryEmail);
  const [contactNumber, setContactNumber] = useState(user?.phoneNumber);
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const handleUpdateBasicInfo = async () => {
    const UID = await getUID();
    const payload: SettingBasicInfoUpdateInterface = {
      id: UID as string,
      recoverEmail: email,
      phoneNumber: contactNumber,
      dateOfBirth: dateOfBirth.toDateString(),
    };

    const response = await ProfileService.updateSettingsBasicInfo(payload);
    if (response) {
      ToastService.showSuccess('Info Updated successfully');
    } else {
      ToastService.showError('Something went wrong');
    }
  };
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Input
          placeholder="Recovery Email"
          onChangeText={setEmail}
          value={email as string}
        />
        <Input
          placeholder="Contact Number"
          onChangeText={setContactNumber}
          value={contactNumber as string}
        />
        <Input
          placeholder="Date of Birth"
          onChangeText={() => {}}
          value={dateOfBirth.toDateString()}
          onPress={() => setOpen(true)}
        />
        <DatePicker
          modal
          open={open}
          date={dateOfBirth}
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
        <PrimaryButton onPress={() => handleUpdateBasicInfo()} title="Save" />
      </View>
    </View>
  );
};

export default BasicInfo;

const styles = StyleSheet.create({
  container: {},
  text: {
    color: 'black',
  },
  saveButton: {
    marginTop: height - 600,
  },
});
