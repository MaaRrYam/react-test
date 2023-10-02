import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Dropdown, Input, PrimaryButton, TextArea } from '@/components';
import { UserInterface } from '@/interfaces';

interface UserInfoProps {
  user: UserInterface;
}

const EditBasicInfoForm: React.FC<UserInfoProps> = ({ user }) => {
  const [name, setName] = useState<string>(user.name);
  const [about, setAbout] = useState<string>(user.description || '');
  const [country, setCountry] = useState<string>(user.country || '');
  const [state, setState] = useState<string>(user.state || '');
  const [city, setCity] = useState<string>(user.city || '');

  const employmentOptions = user.employmentList?.map(
    employment => `${employment.role} at ${employment.companyName}`,
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <ScrollView>
        <Text style={[styles.headerText, {paddingHorizontal: 20,}]}>Basic Information</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <Input
            name="Name"
            placeholder="Name"
            onChangeText={setName}
            value={name}
          />
          <TextArea
            name="About"
            placeholder="About"
            onChangeText={setAbout}
            value={about}
            style={styles.textArea}
          />

          <Text style={styles.headerText}>Current Position</Text>
          <Dropdown
            options={employmentOptions || []}
            style={styles.dropdown}
            startingOption={user.tagline || 'Tagline'}
          />
        </View>

        <ScrollView scrollEnabled style={{ paddingHorizontal: 20, }}>
          <Text style={styles.headerText}>Location</Text>
          <Input
            name="Country"
            placeholder="Country"
            onChangeText={setCountry}
            value={country}
          />
          <Input
            name="State"
            placeholder="State"
            onChangeText={setState}
            value={state}
          />
          <Input
            name="City"
            placeholder="City"
            onChangeText={setCity}
            value={city}
          />
          </ScrollView>
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton
          title="Save"
          onPress={() => { }}
          style={styles.saveButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textArea: {
    height: 106,
  },
  dropdown: {
    marginTop: 10,
  },
  footer: {
    borderTopColor: '#E4E4E4',
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
  saveButton: {
    marginTop: 10,
  },
});

export default EditBasicInfoForm;
