import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';

import {BackButton, Button, Input} from 'components';
import {commonStyles} from 'styles/onboarding';

const SalaryExpectations = () => {
  const [minimumSalary, setMinimumSalary] = useState<string>('');
  const [baseSalary, setBaseSalary] = useState<string>('');
  const [totalCompensation, setTotalCompensation] = useState<string>('');

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
            value={minimumSalary}
            onChangeText={setMinimumSalary}
            keyboardType="numeric"
          />
          <Input
            placeholder="Base Salary"
            value={baseSalary}
            onChangeText={setBaseSalary}
            keyboardType="numeric"
          />
          <Input
            placeholder="Total Compensation"
            value={totalCompensation}
            onChangeText={setTotalCompensation}
            keyboardType="numeric"
          />
        </ScrollView>
        <View style={commonStyles.footer}>
          <Button
            title="Continue"
            onPress={() => console.log('Next button pressed')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SalaryExpectations;
