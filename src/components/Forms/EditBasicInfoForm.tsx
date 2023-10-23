import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useFormik} from 'formik';

import {Dropdown, Input, PrimaryButton, TextArea} from '@/components';
import {UserInfoProps} from '@/interfaces';
import {COLORS, FONTS} from '@/constants';
import {basicInfoSchema} from '@/utils/schemas/profile';
import ProfileService from '@/services/profile';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {updateUserData} from '@/store/features/authSlice';

const EditBasicInfoForm: React.FC<UserInfoProps> = ({onClose}) => {
  const {user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const {
    values,
    touched,
    handleChange,
    handleSubmit,
    errors,
    setFieldTouched,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      name: user.name || '',
      about: user.description || '',
      tagline: user.tagline || '',
      country: user.country || '',
      city: user.city || '',
      state: user.state || '',
    },
    validationSchema: basicInfoSchema,
    onSubmit: async formValues => {
      await ProfileService.handleSaveBasicInformation(formValues);
      dispatch(
        updateUserData({
          ...user,
          ...formValues,
        }),
      );
      setSubmitting(false);
      onClose();
    },
  });

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
            touched={touched.name}
            error={errors.name}
            setFieldTouched={setFieldTouched}
            onChangeText={handleChange('name')}
            value={values.name}
          />
          <TextArea
            name="About"
            placeholder="About"
            onChangeText={handleChange('about')}
            value={values.about as string}
            style={styles.textArea}
            setFieldTouched={setFieldTouched}
            touched={touched.about}
            error={errors.about}
          />

          <Text style={[styles.headerText, styles.subSectionHeader]}>
            Current Position
          </Text>
          <Dropdown
            options={employmentOptions || []}
            style={styles.dropdown}
            selectedOption={values.tagline}
            onOptionSelect={handleChange('tagline')}
            error={errors.tagline}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.headerText, styles.subSectionHeader]}>
            Location
          </Text>
          <Input
            name="Country"
            placeholder="Country"
            onChangeText={handleChange('country')}
            value={values.country}
            setFieldTouched={setFieldTouched}
            touched={touched.country}
            error={errors.country}
          />
          <Input
            name="State"
            placeholder="State"
            onChangeText={handleChange('state')}
            value={values.state}
            setFieldTouched={setFieldTouched}
            touched={touched.state}
            error={errors.state}
          />
          <Input
            name="City"
            placeholder="City"
            onChangeText={handleChange('city')}
            value={values.city}
            setFieldTouched={setFieldTouched}
            touched={touched.city}
            error={errors.city}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton
          title="Save"
          onPress={handleSubmit}
          isLoading={isSubmitting}
          style={styles.saveButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
