import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {useFormik} from 'formik';

import {BackButton, Button, Input} from '@/components';
import {commonStyles} from '@/styles/onboarding';
import {SalaryExpectationsScreenProps} from '@/types';
import {salaryExpectationsSchema} from '@/utils/schemas/onboarding';
import StorageService from '@/services/Storage';
import FirebaseService from '@/services/Firebase';

const SalaryExpectations: React.FC<SalaryExpectationsScreenProps> = ({
  navigation,
}) => {
  const [userId, setUserId] = useState('');

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
    navigation.navigate('OnboardingCompleted');
  };

  const {values, touched, handleChange, handleSubmit, errors} = useFormik({
    initialValues: {
      minimumSalary: '',
      baseSalary: '',
      totalCompensation: '',
    },
    validationSchema: salaryExpectationsSchema,
    onSubmit: values => {
      handleSubmitSalary(values);
    },
  });

  useEffect(() => {
    (async () => {
      const item = await StorageService.getItem('uid');
      setUserId(item);
    })();
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
