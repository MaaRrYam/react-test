import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

import {
  BackButton,
  Button,
  EducationCard,
  BottomSheet,
  EducationForm,
} from '@/components';
import {COLORS, SCREEN_NAMES} from '@/constants';
import {commonStyles} from '@/styles/onboarding';
import {EducationScreenProps} from '@/types';
import {EducationState} from '@/interfaces';
import useUserManagement from '@/hooks/useUserManagement';
import OnboardingService from '@/services/onboarding';

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

  return (
    <>
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.container}>
          <BackButton />
          <Text style={commonStyles.title}>Your Education</Text>
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
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={commonStyles.footer}>
          <Button
            title={education ? 'Add More' : 'Add Education'}
            onPress={() => setIsBottomSheetVisible(true)}
            backgroundColor={COLORS.white}
            textColor={COLORS.black}
            borderWidth={1}
            borderColor={COLORS.border}
            disabled={education && education.length === 3}
          />
          <Button
            title={education ? 'Continue' : 'Skip'}
            onPress={handleContinue}
          />
        </View>
      </SafeAreaView>
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
