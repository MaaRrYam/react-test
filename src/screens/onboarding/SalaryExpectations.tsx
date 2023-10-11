import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {useFormik} from 'formik';

import {BackButton, PrimaryButton, Input} from '@/components';
import {commonStyles} from '@/styles/onboarding';
import {SalaryExpectationsScreenProps} from '@/types';
import {salaryExpectationsSchema} from '@/utils/schemas/onboarding';
import {SCREEN_NAMES} from '@/constants';
import useUserManagement from '@/hooks/useUserManagement';
import OnboardingService from '@/services/onboarding';

const SalaryExpectations: React.FC<SalaryExpectationsScreenProps> = ({
  navigation,
}) => {
  const {user} = useUserManagement();
  const [initialValues, setInitialValues] = useState({
    minimumSalary: '',
    totalCompensation: '',
  });

  const handleSubmitSalary = (values: {
    minimumSalary: string;
    totalCompensation: string;
  }) => {
    const newData = {
      minimumSalary: parseInt(values.minimumSalary),
      totalCompensation: parseInt(values.totalCompensation),
      onboardingStep: 4,
    };
    OnboardingService.SalaryExpectation(newData);
    navigation.navigate(SCREEN_NAMES.OnboardingCompleted);
  };

  const {values, touched, handleChange, handleSubmit, errors} = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: salaryExpectationsSchema,
    onSubmit: values => {
      handleSubmitSalary(values);
    },
  });

  useEffect(() => {
    setInitialValues({
      minimumSalary: user?.minimumSalary?.toString() || '',
      totalCompensation: user?.totalCompensation?.toString() || '',
    });
  }, [user]);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        <BackButton onPress={() => console.log('Back button pressed')} />
        <Text style={commonStyles.title}>
          Salary Expectations for Job Search
        </Text>

        <ScrollView>
          <Input
            placeholder="Minimum Salary Expectations"
            value={values.minimumSalary}
            onChangeText={handleChange('minimumSalary')}
            keyboardType="numeric"
            touched={touched.minimumSalary}
            error={errors.minimumSalary}
          />
          <Input
            placeholder="Total Compensation"
            value={values.totalCompensation}
            onChangeText={handleChange('totalCompensation')}
            keyboardType="numeric"
            touched={touched.totalCompensation}
            error={errors.totalCompensation}
          />
        </ScrollView>
      </View>
      <View style={commonStyles.footer}>
        <PrimaryButton title="Continue" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default SalaryExpectations;
