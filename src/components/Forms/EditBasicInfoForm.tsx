import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Dropdown, Input, PrimaryButton, TextArea} from '@/components';
import {UserInterface} from '@/interfaces';
import {COLORS, FONTS} from '@/constants';

interface UserInfoProps {
  user: UserInterface;
}

const EditBasicInfoForm: React.FC<UserInfoProps> = ({user}) => {
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
        <Text
          style={[
            styles.headerText,
            styles.sectionHeader,
            {paddingHorizontal: 20},
          ]}>
          Basic Information
        </Text>
        <View style={styles.section}>
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

          <Text style={[styles.headerText, styles.subSectionHeader]}>
            Current Position
          </Text>
          <Dropdown
            options={employmentOptions || []}
            style={styles.dropdown}
            startingOption={user.tagline || 'Tagline'}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.headerText, styles.subSectionHeader]}>
            Location
          </Text>
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
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton
          title="Save"
          onPress={() => {}}
          style={styles.saveButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white, // Set your background color here
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: FONTS.largeLabel,
  },
  subSectionHeader: {
    marginTop: 10,
  },
  headerText: {
    color: COLORS.black,
    fontSize: FONTS.largeLabel,
    fontWeight: 'bold',
  },
  textArea: {
    height: 106,
  },
  dropdown: {
    marginTop: 10,
  },
  footer: {
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  saveButton: {
    marginTop: 10,
  },
});

export default EditBasicInfoForm;
