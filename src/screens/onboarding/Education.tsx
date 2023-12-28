import React, {useState} from 'react';
import {FlatList} from 'react-native';

import {
  PrimaryButton,
  EducationCard,
  BottomSheet,
  EducationForm,
} from '@/components';
import {COLORS, SCREEN_NAMES} from '@/constants';
import {EducationScreenProps} from '@/types';
import {EducationState} from '@/interfaces';
import useUserManagement from '@/hooks/useUserManagement';
import OnboardingService from '@/services/onboarding';
import Layout from './Layout';

const Education: React.FC<EducationScreenProps> = ({navigation}) => {
  const {user} = useUserManagement();
  const [education, setEducation] = useState<EducationState[]>(
    user?.educationList || [],
  );
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleContinue = () => {
    OnboardingService.education(education);
    navigation.navigate(SCREEN_NAMES.Industry);
  };

  const handleAddNewEducation = (newEducation: EducationState) => {
    setEducation(prev => [...prev, newEducation]);
    setIsBottomSheetVisible(false);
  };

  const handleRemoveEducation = (id: string) => {
    setEducation(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <Layout
        title="Your Education"
        footer={
          <>
            <PrimaryButton
              title="Add"
              onPress={() => setIsBottomSheetVisible(true)}
              backgroundColor={COLORS.white}
              textColor={COLORS.black}
              borderWidth={1}
              borderColor={COLORS.border}
              disabled={education && education.length === 3}
            />
            <PrimaryButton
              title={education.length ? 'Continue' : 'Skip'}
              onPress={handleContinue}
            />
          </>
        }>
        <FlatList
          data={education}
          renderItem={({item}) => (
            <EducationCard
              id={item.id}
              instituteName={item.instituteName}
              degree={item.degree}
              startingYear={item.startYear}
              endingYear={item.endYear}
              currentlyWorking={item.currentlyStudying}
              onPress={educationData => {
                console.log('Education card pressed:', educationData);
              }}
              onRemove={id => handleRemoveEducation(id)}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </Layout>
      {isBottomSheetVisible && (
        <BottomSheet
          isVisible={isBottomSheetVisible}
          onClose={() => setIsBottomSheetVisible(false)}>
          <EducationForm handleAddNewEducation={handleAddNewEducation} />
        </BottomSheet>
      )}
    </>
  );
};

export default Education;
