import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';

import {
  BackButton,
  Button,
  ExperienceCard,
  BottomSheet,
  ExperienceForm,
} from '@/components';
import {COLORS} from '@/constants';
import {commonStyles} from '@/styles/onboarding';
import {ExperienceScreenProps} from '@/types';
import {ExperienceState} from '@/interfaces';
import FirebaseService from '@/services/Firebase';
import StorageService from '@/services/Storage';

const Experience: React.FC<ExperienceScreenProps> = ({navigation}) => {
  const [experience, setExperience] = useState<ExperienceState[]>([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [userId, setUserId] = useState('');

  const handleContinue = () => {
    FirebaseService.updateDocument('users', userId, {
      employmentList: experience,
      onboardingStep: 3,
    });
    navigation.navigate('EmploymentStatus');
  };

  const handleAddNewExperience = (newExperience: ExperienceState) => {
    setExperience(prev => [...prev, newExperience]);
    setIsBottomSheetVisible(false);
  };

  useEffect(() => {
    (async () => {
      const item = await StorageService.getItem('uid');
      setUserId(item);
      const data = await FirebaseService.getDocument('users', item);
      setExperience(data.employmentList);
    })();
  }, []);

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
          <Button
            title={experience.length ? 'Add More' : 'Add Experience'}
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
