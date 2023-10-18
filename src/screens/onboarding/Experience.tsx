import React, {useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';

import {
  BackButton,
  Button,
  ExperienceCard,
  BottomSheet,
  ExperienceForm,
} from '@/components';
import {COLORS, SCREEN_NAMES} from '@/constants';
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
    navigation.navigate(SCREEN_NAMES.EmploymentStatus);
  };

  const handleAddNewExperience = (newExperience: ExperienceState) => {
    setExperience(prev => [...prev, newExperience]);
    setIsBottomSheetVisible(false);
  };

  return (
    <>
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.container}>
          <BackButton onPress={() => console.log('Back button pressed')} />
          <Text style={commonStyles.title}>Your Experience</Text>

          <FlatList
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
          />
        </View>
        <View style={commonStyles.footer}>
          <Button
            title="Add More"
            onPress={() => setIsBottomSheetVisible(true)}
            backgroundColor={COLORS.white}
            textColor={COLORS.black}
            borderWidth={1}
            borderColor={COLORS.border}
          />
          <Button
            title={experience.length ? 'Continue' : 'Skip'}
            onPress={handleContinue}
          />
        </View>
      </SafeAreaView>
      {isBottomSheetVisible && (
        <BottomSheet
          isVisible={isBottomSheetVisible}
          onClose={() => setIsBottomSheetVisible(false)}
          snapPoints={['20%', '60%']}>
          <ExperienceForm handleAddNewExperience={handleAddNewExperience} />
        </BottomSheet>
      )}
    </>
  );
};

export default Experience;
