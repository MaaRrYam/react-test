import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';

import {BackButton, Button, EmploymentSelectionField} from '@/components';
import {SCREEN_NAMES, employmentStatuses} from '@/constants';
import {commonStyles} from '@/styles/onboarding';
import {EmploymentStatusScreenProps} from '@/types';
import FirebaseService from '@/services/Firebase';
import StorageService from '@/services/Storage';

const EmploymentStatus: React.FC<EmploymentStatusScreenProps> = ({
  navigation,
}) => {
  const [employment, setEmployment] = useState<string>('');
  const [userId, setUserId] = useState('');

  const handleEmploymentStatus = () => {
    FirebaseService.updateDocument('users', userId, {
      currentStatus: employment,
      onboardingStep: 4,
    });
    navigation.navigate(SCREEN_NAMES.SalaryExpectations);
  };

  useEffect(() => {
    (async () => {
      const item = await StorageService.getItem('uid');
      setUserId(item);
      const data = await FirebaseService.getDocument('users', item);
      setEmployment(data.currentStatus);
    })();
  }, []);

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
        <Button title="Continue" onPress={() => handleEmploymentStatus()} />
      </View>
    </SafeAreaView>
  );
};

export default EmploymentStatus;
