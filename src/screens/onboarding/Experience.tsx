import React, {useState} from 'react';
import {FlatList} from 'react-native';

import {
  PrimaryButton,
  ExperienceCard,
  BottomSheet,
  ExperienceForm,
} from '@/components';
import {COLORS} from '@/constants';
import Layout from './Layout';

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

  const handleRemoveExperience = (id: string) => {
    setExperience(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <Layout
        title="Your Experience"
        footer={
          <>
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
          </>
        }>
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
              onRemove={id => handleRemoveExperience(id)}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </Layout>

      {isBottomSheetVisible && (
        <BottomSheet
          isVisible={isBottomSheetVisible}
          onClose={() => setIsBottomSheetVisible(false)}
          snapPoints={['20%', '65%']}>
          <ExperienceForm handleAddNewExperience={handleAddNewExperience} />
        </BottomSheet>
      )}
    </>
  );
};

export default Experience;
