import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';

import {
  BackButton,
  PrimaryButton,
  EmploymentSelectionField,
} from '@/components';
import {SCREEN_NAMES, employmentStatuses} from '@/constants';
import {commonStyles} from '@/styles/onboarding';
import {EmploymentStatusScreenProps} from '@/types';
import useUserManagement from '@/hooks/useUserManagement';
import OnboardingService from '@/services/onboarding';

const EmploymentStatus: React.FC<EmploymentStatusScreenProps> = ({
  navigation,
}) => {
  const {user} = useUserManagement();
  const [employment, setEmployment] = useState<string>(
    user?.currentStatus || '',
  );

  const handleEmploymentStatus = () => {
    OnboardingService.employmentStatus(employment);
    navigation.navigate(SCREEN_NAMES.SalaryExpectations);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            estimatedItemSize={5}
          />
        </View>
        <View style={commonStyles.footer}>
          <PrimaryButton title="Continue" onPress={handleEmploymentStatus} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EmploymentStatus;
