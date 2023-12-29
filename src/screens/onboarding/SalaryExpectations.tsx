/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ScrollView, Platform, View, Text} from 'react-native';
import {useFormik} from 'formik';

import {PrimaryButton, Input} from '@/components';
import {SalaryExpectationsScreenProps} from '@/types';
import {salaryExpectationsSchema} from '@/utils/schemas/onboarding';
import {SCREEN_NAMES} from '@/constants';
import useUserManagement from '@/hooks/useUserManagement';
import OnboardingService from '@/services/onboarding';
import Layout from './Layout';
import {InfoIcon} from '@/assets/icons';

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
    <>
      <Layout
        title="Salary Expectations for Job Search"
        footer={<PrimaryButton title="Continue" onPress={handleSubmit} />}>
        <ScrollView>
          <Input
            placeholder="Minimum Salary Expectations"
            value={values.minimumSalary}
            onChangeText={handleChange('minimumSalary')}
            keyboardType="numeric"
            touched={touched.minimumSalary}
            error={errors.minimumSalary}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          />
          <Input
            placeholder="Total Compensation"
            value={values.totalCompensation}
            onChangeText={handleChange('totalCompensation')}
            keyboardType="numeric"
            touched={touched.totalCompensation}
            error={errors.totalCompensation}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: 22,
            }}>
            <InfoIcon />
            <Text style={{color: '#7D7D7D', marginLeft: 10}}>
              Confidential Minimum Salary Information is strictly kept private
              and not disclosed to any third parties on the platform. This
              information serves solely as a screening tool to evaluate
              potential job roles and identify new career prospects that align
              with your expectations.
            </Text>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};

export default SalaryExpectations;
