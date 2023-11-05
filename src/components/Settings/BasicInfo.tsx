import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Input} from '../Inputs';
import {PrimaryButton} from '../Buttons';
import {getScreenDimensions} from '@/utils/functions';

const {height} = getScreenDimensions();
const BasicInfo = () => {
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Input
          placeholder="Recovery Email"
          onChangeText={setEmail}
          value={email}
        />
        <Input
          placeholder="Contact Number"
          onChangeText={setContactNumber}
          value={contactNumber}
        />
        <Input
          placeholder="Date of Birth"
          onChangeText={setDateOfBirth}
          value={dateOfBirth}
        />
      </View>
      <View style={styles.saveButton}>
        <PrimaryButton onPress={() => {}} title="Save" />
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
