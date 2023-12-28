import React, {useEffect, useRef} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  TextInput,
  Platform,
} from 'react-native';
import {useFormik} from 'formik';

import {addEducationSchema} from '@/utils/schemas/onboarding';
import {
  Checkbox,
  PrimaryButton,
  KeyboardAvoidingView,
  BottomSheetInput,
} from '@/components';
import {COLORS} from '@/constants';
import {EducationState} from '@/interfaces';
import {commonStyles} from '@/styles/onboarding';

const EducationForm = ({
  handleAddNewEducation,
}: {
  handleAddNewEducation: (newEducation: EducationState) => void;
}) => {
  const degreeName = useRef<TextInput>(null);
  const startingYear = useRef<TextInput>(null);
  const endingYear = useRef<TextInput>(null);

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    touched,
    setFieldTouched,
    setFieldValue,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: {
      instituteName: '',
      degree: '',
      startYear: `${new Date().getFullYear()}`,
      endYear: `${new Date().getFullYear()}`,
      currentlyStudying: false,
    },
    validationSchema: addEducationSchema,
    onSubmit: formValues => {
      const payload = {id: Number(Math.random()), ...formValues};

      handleAddNewEducation(payload);
      handleReset({
        values: {
          instituteName: '',
          degree: '',
          startYear: `${new Date().getFullYear()}`,
          endYear: `${new Date().getFullYear()}`,
          currentlyStudying: false,
        },
      });
    },
  });

  useEffect(() => {
    console.log(values.currentlyStudying);
  }, [values.currentlyStudying]);

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <KeyboardAvoidingView>
        <View style={commonStyles.container}>
          <ScrollView>
            <BottomSheetInput
              placeholder="Name of School"
              value={values.instituteName}
              onChangeText={handleChange('instituteName')}
              touched={touched.instituteName}
              onBlur={handleBlur('instituteName')}
              error={errors.instituteName}
              name="instituteName"
              setFieldTouched={setFieldTouched}
              onSubmitEditing={() => degreeName.current?.focus()}
              returnKeyType="next"
            />
            <BottomSheetInput
              placeholder="Degree Title"
              value={values.degree}
              onChangeText={handleChange('degree')}
              onBlur={handleBlur('degree')}
              touched={touched.degree}
              error={errors.degree}
              name="degree"
              setFieldTouched={setFieldTouched}
              forwardedRef={degreeName}
              onSubmitEditing={() => startingYear.current?.focus()}
              returnKeyType="next"
            />

            <BottomSheetInput
              placeholder="Starting Year"
              value={values.startYear}
              onChangeText={handleChange('startYear')}
              onBlur={handleBlur('startYear')}
              error={errors.startYear}
              name="startYear"
              touched={touched.startYear}
              setFieldTouched={setFieldTouched}
              keyboardType="numeric"
              forwardedRef={startingYear}
              returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
              onSubmitEditing={() => endingYear.current?.blur()}
            />

            <BottomSheetInput
              placeholder="Ending Year"
              value={values.endYear}
              onChangeText={handleChange('endYear')}
              onBlur={handleBlur('endYear')}
              error={errors.endYear}
              touched={touched.endYear}
              name="endYear"
              setFieldTouched={setFieldTouched}
              keyboardType="numeric"
              disabled={values.currentlyStudying}
              forwardedRef={endingYear}
              returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            />

            <Checkbox
              onPress={() =>
                setFieldValue('currentlyStudying', !values.currentlyStudying)
              }
              isChecked={values.currentlyStudying}
              text="Currently Studying"
              fillColor={COLORS.primary}
              style={{marginBottom: 20}}
            />
          </ScrollView>
          <View style={commonStyles.footer}>
            <PrimaryButton title="Continue" onPress={handleSubmit} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EducationForm;
