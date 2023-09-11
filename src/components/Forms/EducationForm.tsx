import React from 'react';
import {ScrollView, SafeAreaView, View} from 'react-native';
import {useFormik} from 'formik';

import {addEducationSchema} from '@/utils/schemas/onboarding';
import {Input, Checkbox, Button} from '@/components';
import {COLORS} from '@/constants';
import {EducationState} from '@/interfaces';
import {commonStyles} from '@/styles/onboarding';

const EducationForm = ({
  handleAddNewEducation,
}: {
  handleAddNewEducation: (newEducation: EducationState) => void;
}) => {
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
      cgpa: '',
      startingYear: `${new Date().getFullYear()}`,
      endingYear: `${new Date().getFullYear()}`,
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
          cgpa: '',
          startingYear: `${new Date().getFullYear()}`,
          endingYear: `${new Date().getFullYear()}`,
          currentlyStudying: false,
        },
      });
    },
  });

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.container}>
        <Input
          placeholder="Institute Name"
          value={values.instituteName}
          onChangeText={handleChange('instituteName')}
          touched={touched.instituteName}
          onBlur={handleBlur('instituteName')}
          error={errors.instituteName}
          name="instituteName"
          setFieldTouched={setFieldTouched}
        />
        <Input
          placeholder="Degree Name"
          value={values.degree}
          onChangeText={handleChange('degree')}
          onBlur={handleBlur('degree')}
          touched={touched.degree}
          error={errors.degree}
          name="degree"
          setFieldTouched={setFieldTouched}
        />
        <Input
          placeholder="CGPA (Optional)"
          value={values.cgpa}
          onChangeText={handleChange('cgpa')}
          onBlur={handleBlur('cgpa')}
          error={errors.cgpa}
          touched={touched.cgpa}
          name="cgpa"
          setFieldTouched={setFieldTouched}
          keyboardType="numeric"
        />

        <Input
          placeholder="Starting Year"
          value={values.startingYear}
          onChangeText={handleChange('startingYear')}
          onBlur={handleBlur('startingYear')}
          error={errors.startingYear}
          name="startingYear"
          touched={touched.startingYear}
          setFieldTouched={setFieldTouched}
          keyboardType="numeric"
        />

        <Input
          placeholder="Ending Year"
          value={values.endingYear}
          onChangeText={handleChange('endingYear')}
          onBlur={handleBlur('endingYear')}
          error={errors.endingYear}
          touched={touched.endingYear}
          name="endingYear"
          setFieldTouched={setFieldTouched}
          keyboardType="numeric"
          disabled={values.currentlyStudying}
        />

        <Checkbox
          onPress={(newValue: boolean) =>
            setFieldValue('currentlyStudying', newValue)
          }
          text="Currently Studying"
          fillColor={COLORS.primary}
          style={{marginBottom: 20}}
        />

        <View style={commonStyles.footer}>
          <Button title="Continue" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EducationForm;
