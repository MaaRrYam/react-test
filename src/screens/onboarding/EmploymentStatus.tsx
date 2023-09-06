import React, {useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';

import {BackButton, Button, EmploymentSelectionField} from '@/components';
import {employmentStatuses} from '@/constants';
import {commonStyles} from '@/styles/onboarding';
import {EmploymentStatusScreenProps} from '@/types';

const EmploymentStatus: React.FC<EmploymentStatusScreenProps> = ({
  navigation,
}) => {
  const [employment, setEmployment] = useState<string>(employmentStatuses[0]);
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        <BackButton onPress={() => console.log('Back button pressed')} />
        <Text style={commonStyles.title}>Current Employment Status</Text>

        <FlatList
          data={employmentStatuses}
          renderItem={({item}) => (
            <EmploymentSelectionField
              key={item}
              text={item}
              isSelected={item === employment}
              onPress={selectionStatus => {
                setEmployment(selectionStatus);
              }}
            />
          )}
          keyExtractor={item => item}
        />
      </View>
      <View style={commonStyles.footer}>
        <Button
          title="Continue"
          onPress={() => navigation.navigate('SalaryExpectations')}
        />
      </View>
    </SafeAreaView>
  );
};

export default EmploymentStatus;
