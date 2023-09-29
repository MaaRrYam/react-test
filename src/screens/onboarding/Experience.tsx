import React, {useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';

import {
  BackButton,
  PrimaryButton,
  ExperienceCard,
  BottomSheet,
  ExperienceForm,
} from '@/components';
import {COLORS, SCREEN_NAMES} from '@/constants';
import {commonStyles} from '@/styles/onboarding';
import {ExperienceScreenProps} from '@/types';
import {ExperienceState} from '@/interfaces';

const Experience: React.FC<ExperienceScreenProps> = ({navigation}) => {
  const [experience, setExperience] = useState<ExperienceState[]>([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleContinue = () => {
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
                currentCompany={item.currentCompany}
                designation={item.designation}
                startingYear={item.startingYear}
                endingYear={item.endingYear}
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
          <PrimaryButton
            title="Add More"
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
