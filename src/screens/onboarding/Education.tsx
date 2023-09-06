import React, {useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';

import {BackButton, Button, EducationCard} from '@/components';
import {COLORS, tempEducation} from '@/constants';
import {commonStyles} from '@/styles/onboarding';
import {EducationScreenProps} from '@/types';
import useBottomSheet from '@/hooks/useBottomSheet';

const Education: React.FC<EducationScreenProps> = ({navigation}) => {
  const [education] = useState(tempEducation);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        <BackButton onPress={() => console.log('Back button pressed')} />
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
          onPress={() => console.log('Add More Button Pressed')}
          backgroundColor={COLORS.white}
          textColor={COLORS.black}
          borderWidth={1}
          borderColor={COLORS.border}
        />
        <Button
          title="Continue"
          onPress={() => navigation.navigate('Industry')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Education;
