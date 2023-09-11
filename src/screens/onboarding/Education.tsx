import React, {useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';

import {
  BackButton,
  Button,
  EducationCard,
  BottomSheet,
  EducationForm,
} from '@/components';
import {COLORS} from '@/constants';
import {commonStyles} from '@/styles/onboarding';
import {EducationScreenProps} from '@/types';
import {EducationState} from '@/interfaces';

const Education: React.FC<EducationScreenProps> = ({navigation}) => {
  const [education, setEducation] = useState<EducationState[]>([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleContinue = () => {
    navigation.navigate('Industry');
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
                cgpa={item.cgpa}
                startingYear={item.startingYear}
                endingYear={item.endingYear}
                currentlyWorking={item.currentlyWorking}
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
            title="Add More"
            onPress={() => setIsBottomSheetVisible(true)}
            backgroundColor={COLORS.white}
            textColor={COLORS.black}
            borderWidth={1}
            borderColor={COLORS.border}
            disabled={education.length === 3}
          />
          <Button
            title={education.length ? 'Continue' : 'Skip'}
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
