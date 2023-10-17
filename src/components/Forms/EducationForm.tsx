import React from 'react';
import {ScrollView, SafeAreaView, View} from 'react-native';
import {useFormik} from 'formik';

import {addEducationSchema} from '@/utils/schemas/onboarding';
import {Input, Checkbox, Button} from '@/components';
import {COLORS} from '@/constants';
import {EducationState} from '@/interfaces';
import {commonStyles} from '@/styles/onboarding';

const handleCheckbox = (newValue: boolean) => {};
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
          placeholder="Starting Year"
          value={values.startYear}
          onChangeText={handleChange('startYear')}
          onBlur={handleBlur('startYear')}
          error={errors.startYear}
          name="startYear"
          touched={touched.startYear}
          setFieldTouched={setFieldTouched}
          keyboardType="numeric"
        />

        <Input
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
        />

        <Checkbox
          onPress={() =>
            setFieldValue('currentlyStudying', !values.currentlyStudying)
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
