import React from 'react';
import {ScrollView, SafeAreaView, View} from 'react-native';
import {useFormik} from 'formik';

import {addExperienceSchema} from '@/utils/schemas/onboarding';
import {Input, Checkbox, Button} from '@/components';
import {COLORS} from '@/constants';
import {ExperienceState} from '@/interfaces';
import {commonStyles} from '@/styles/onboarding';

const ExperienceForm = ({
  handleAddNewExperience,
}: {
  handleAddNewExperience: (newExperience: ExperienceState) => void;
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
      currentCompany: '',
      designation: '',
      startingYear: `${new Date().getFullYear()}`,
      endingYear: `${new Date().getFullYear()}`,
      currentlyWorking: false,
    },
    validationSchema: addExperienceSchema,
    onSubmit: formValues => {
      const payload = {
        id: Number(Math.random()),
        ...formValues,
        startingYear: Number(formValues.startingYear),
        endingYear: Number(formValues.endingYear),
      };

      handleAddNewExperience(payload);
      handleReset({
        values: {
          currentCompany: '',
          designation: '',
          startingYear: `${new Date().getFullYear()}`,
          endingYear: `${new Date().getFullYear()}`,
          currentlyWorking: false,
        },
      });
    },
  });

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.container}>
        <Input
          placeholder="Current Company"
          value={values.currentCompany}
          onChangeText={handleChange('currentCompany')}
          touched={touched.currentCompany}
          onBlur={handleBlur('currentCompany')}
          error={errors.currentCompany}
          name="currentCompany"
          setFieldTouched={setFieldTouched}
        />
        <Input
          placeholder="Designation"
          value={values.designation}
          onChangeText={handleChange('designation')}
          onBlur={handleBlur('designation')}
          touched={touched.designation}
          error={errors.designation}
          name="designation"
          setFieldTouched={setFieldTouched}
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
          disabled={values.currentlyWorking}
        />

        <Checkbox
          onPress={(newValue: boolean) =>
            setFieldValue('currentlyWorking', newValue)
          }
          text="Currently Working"
          fillColor={COLORS.primary}
          style={{marginBottom: 20}}
        />

        <View style={commonStyles.footer}>
          <Button title="Add as Work Experience" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExperienceForm;
