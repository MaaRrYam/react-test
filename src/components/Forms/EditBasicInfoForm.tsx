import React, {useEffect} from 'react';
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
import {useFormik} from 'formik';
import {basicInfoSchema} from '@/utils/schemas/profile';
import FirebaseService from '@/services/Firebase';
import {getUID} from '@/utils/functions';

interface UserInfoProps {
  user: UserInterface;
  onClose: () => void;
  setIsEdit?: (value: boolean) => void;
}

const EditBasicInfoForm: React.FC<UserInfoProps> = ({user, onClose}) => {
  // const user = useUserDoc();

  const handleSave = async (formValues: {
    name: string;
    about: string;
    tagline: string;
    country: string;
    city: string;
    state: string;
  }) => {
    await console.log(formValues);
    const uid = await getUID();
    await FirebaseService.updateDocument('users', uid as string, {
      name: formValues.name,
      description: formValues.about,
      tagline: formValues.tagline,
      country: formValues.country,
      state: formValues.state,
      city: formValues.city,
    });
    setSubmitting(false);
    onClose();
  };
  const {
    values,
    touched,
    handleChange,
    handleSubmit,
    errors,
    setFieldTouched,
    isSubmitting,
    setSubmitting,
    handleReset,
  } = useFormik({
    initialValues: {
      name: user.name ? user.name : '',
      about: user.description ? (user.description as string) : '',
      tagline: user.tagline ? (user.tagline as string) : '',
      country: user.country ? user.country : '',
      city: user.city ? user.city : '',
      state: user.state ? user.state : '',
    },
    validationSchema: basicInfoSchema,
    onSubmit: formValues => {
      handleSave(formValues);
      handleReset({
        values: {
          name: '',
          about: '',
          tagline: '',
          country: '',
          city: '',
          state: '',
        },
      });
    },
  });
  const employmentOptions = user.employmentList?.map(
    employment => `${employment.role} at ${employment.companyName}`,
  );
  useEffect(() => {
    console.log(user);
  }, [user]);

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
            startingOption={values.tagline || 'Select an optiona'}
            selectedOption={values.tagline}
            onOptionSelect={handleChange('tagline')}
            error={errors.tagline}
            touched={touched.tagline}
            setFieldTouched={setFieldTouched}
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
