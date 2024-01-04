import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useFormik} from 'formik';

import {Dropdown, Input, PrimaryButton, TextArea} from '@/components';
import {UserInfoProps} from '@/interfaces';
import {COLORS, FONTS} from '@/constants';
import {basicInfoSchema} from '@/utils/schemas/profile';
import ProfileService from '@/services/profile';
import {useAppSelector} from '@/hooks/useAppSelector';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {updateUserData} from '@/store/features/authSlice';
import useCountryStateCity from '@/hooks/useCountryStateCity';

const EditBasicInfoForm: React.FC<UserInfoProps> = ({onClose}) => {
  const {user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const {
    renderUI,
    selectedCity,
    selectedCountry,
    selectedState,
    allCities,
    allStates,
  } = useCountryStateCity();

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
    },
    validationSchema: basicInfoSchema,
    onSubmit: async formValues => {
      const payload = {
        ...formValues,
        country: selectedCountry,
        state: allStates.length && selectedState ? selectedState : '',
        city: allCities.length && selectedCity ? selectedCity : '',
      };
      await ProfileService.handleSaveBasicInformation(payload);
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
    <>
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

      <View style={[styles.section]}>
        <Text style={[styles.headerText, styles.subSectionHeader]}>
          Location
        </Text>
        {renderUI()}
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          title="Save"
          onPress={handleSubmit}
          isLoading={isSubmitting}
          style={styles.saveButton}
        />
      </View>
    </>
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
  saveButton: {},
});

export default EditBasicInfoForm;
