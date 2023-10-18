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
      companyName: '',
      role: '',
      startYear: `${new Date().getFullYear()}`,
      endYear: `${new Date().getFullYear()}`,
      currentlyWorking: false,
    },
    validationSchema: addExperienceSchema,
    onSubmit: formValues => {
      const payload = {
        id: Number(Math.random()),
        ...formValues,
        startYear: Number(formValues.startYear),
        endYear: Number(formValues.endYear),
      };

      handleAddNewExperience(payload);
      handleReset({
        values: {
          companyName: '',
          role: '',
          startYear: `${new Date().getFullYear()}`,
          endYear: `${new Date().getFullYear()}`,
          currentlyWorking: false,
        },
      });
    },
  });

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.container}>
        <Input
          placeholder="Company Name"
          value={values.companyName}
          onChangeText={handleChange('companyName')}
          touched={touched.companyName}
          onBlur={handleBlur('companyName')}
          error={errors.companyName}
          name="companyName"
          setFieldTouched={setFieldTouched}
        />
        <Input
          placeholder="Role"
          value={values.role}
          onChangeText={handleChange('role')}
          onBlur={handleBlur('role')}
          touched={touched.role}
          error={errors.role}
          name="role"
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
