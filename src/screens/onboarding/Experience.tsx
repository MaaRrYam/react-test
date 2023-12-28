import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {
  BackButton,
  PrimaryButton,
  ExperienceCard,
  BottomSheet,
  ExperienceForm,
} from '@/components';
import {COLORS} from '@/constants';
import {commonStyles} from '@/styles/onboarding';
import {ExperienceScreenProps} from '@/types';
import {ExperienceState} from '@/interfaces';
import useUserManagement from '@/hooks/useUserManagement';
import OnboardingService from '@/services/onboarding';

const Experience: React.FC<ExperienceScreenProps> = ({navigation}) => {
  const {user} = useUserManagement();
  const [experience, setExperience] = useState<ExperienceState[]>(
    user?.employmentList || [],
  );
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleContinue = async () => {
    OnboardingService.experience(experience);
    // navigation.navigate('EmploymentStatus');
    navigation.navigate('SalaryExpectations');
  };

  const handleAddNewExperience = (newExperience: ExperienceState) => {
    setExperience(prev => [...prev, newExperience]);
    setIsBottomSheetVisible(false);
  };

  return (
    <>
      <SafeAreaView style={commonStyles.container}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <>
            <View style={commonStyles.container}>
              <BackButton onPress={() => console.log('Back button pressed')} />
              <Text style={commonStyles.title}>Your Experience</Text>

              <FlashList
                data={experience}
                renderItem={({item}) => (
                  <ExperienceCard
                    id={item.id}
                    currentCompany={item.companyName}
                    designation={item.role}
                    startingYear={item.startYear}
                    endingYear={item.endYear}
                    currentlyWorking={item.currentlyWorking}
                    onPress={id => {
                      console.log('Experience card pressed:', id);
                    }}
                  />
                )}
                keyExtractor={item => item.id.toString()}
                estimatedItemSize={10}
              />
            </View>
            <View style={commonStyles.footer}>
              <PrimaryButton
                title="Add"
                onPress={() => setIsBottomSheetVisible(true)}
                backgroundColor={COLORS.white}
                textColor={COLORS.black}
                borderWidth={1}
                borderColor={COLORS.border}
              />
              <PrimaryButton
                title={experience.length ? 'Continue' : 'Skip'}
                onPress={handleContinue}
              />
            </View>
            {isBottomSheetVisible && (
              <BottomSheet
                isVisible={isBottomSheetVisible}
                onClose={() => setIsBottomSheetVisible(false)}
                snapPoints={['20%', '65%']}>
                <ExperienceForm
                  handleAddNewExperience={handleAddNewExperience}
                />
              </BottomSheet>
            )}
          </>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Experience;
