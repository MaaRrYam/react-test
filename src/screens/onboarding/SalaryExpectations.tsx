import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {useFormik} from 'formik';

import {BackButton, Button, Input} from '@/components';
import {commonStyles} from '@/styles/onboarding';
import {SalaryExpectationsScreenProps} from '@/types';
import {salaryExpectationsSchema} from '@/utils/schemas/onboarding';
import StorageService from '@/services/Storage';
import FirebaseService from '@/services/Firebase';
import {SCREEN_NAMES} from '@/constants';

const SalaryExpectations: React.FC<SalaryExpectationsScreenProps> = ({
  navigation,
}) => {
  const [userId, setUserId] = useState('');
  const [initialValues, setInitialValues] = useState({
    minimumSalary: '',
    baseSalary: '',
    totalCompensation: '',
  });

  const handleSubmitSalary = (values: {
    minimumSalary: string;
    baseSalary: string;
    totalCompensation: string;
  }) => {
    const newData = {
      minimumSalary: parseInt(values.minimumSalary),
      baseSalary: parseInt(values.baseSalary),
      totalCompensation: parseInt(values.totalCompensation),
      onboardingStep: 4,
    };
    FirebaseService.updateDocument('users', userId, newData);
    navigation.navigate(SCREEN_NAMES.OnboardingCompleted);
  };

  const {values, touched, handleChange, handleSubmit, errors} = useFormik({
    initialValues,
    enableReinitialize: true, // Enable reinitialization when initialValues change
    validationSchema: salaryExpectationsSchema,
    onSubmit: values => {
      handleSubmitSalary(values);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await StorageService.getItem('uid');
        setUserId(item);
        const data = await FirebaseService.getDocument('users', item);

        if (data) {
          setInitialValues({
            minimumSalary: data.minimumSalary.toString() || '',
            baseSalary: data.baseSalary.toString() || '',
            totalCompensation: data.totalCompensation.toString() || '',
          });
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, []);

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
            placeholder="Base Salary"
            value={values.baseSalary}
            touched={touched.baseSalary}
            error={errors.baseSalary}
            onChangeText={handleChange('baseSalary')}
            keyboardType="numeric"
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
        <Button title="Continue" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default SalaryExpectations;
