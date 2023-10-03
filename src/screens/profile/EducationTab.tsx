import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {CareerCard} from '@/components';
import {EducationTabProps} from '@/interfaces';

const EducationTab = ({educationList}: EducationTabProps) => {
  return (
    <ScrollView>
      {educationList.map((item, index) => (
        <View
          key={index}
          style={[
            styles.educationItem,
            {
              borderBottomColor:
                index === educationList.length - 1 ? 'transparent' : '#E4E4E4',
            },
          ]}>
          <CareerCard
            title={item.degree}
            company={item.instituteName}
            startDate={item.startYear}
            endDate={item.currentlyStudying ? 'Present' : item.endYear}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  educationItem: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
});

export default EducationTab;
