import React, {useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import {BackButton, Button, ExperienceCard} from 'components';
import {COLORS, tempExperience} from '../../constants';
import {commonStyles} from 'styles/onboarding';
import {ExperienceScreenProps} from 'types';

const Experience: React.FC<ExperienceScreenProps> = ({navigation}) => {
  const [experience] = useState(tempExperience);

  return (
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

        <View style={commonStyles.footer}>
          <Button
            title="Add More"
            onPress={() => console.log('Experience Add More Button Pressed')}
            backgroundColor={COLORS.white}
            textColor={COLORS.black}
            borderWidth={1}
            borderColor={COLORS.border}
          />
          <Button
            title="Continue"
            onPress={() => navigation.navigate('EmploymentStatus')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Experience;
