import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {EducationProps} from '@/interfaces';
import {CareerCard} from '../Cards';

interface EditEducationProps {
  educationList: Array<EducationProps>;
}

const EditEducationForm = ({educationList}: EditEducationProps) => {
  return (
    <ScrollView>
      {educationList.map((item, index) => (
        <View
          style={{
            paddingHorizontal: 20,
            borderBottomColor:
              index === educationList.length - 1 ? 'transparent' : '#E4E4E4',
            borderBottomWidth: index === educationList.length - 1 ? 0 : 1,
          }}>
          <CareerCard
            title={item.degree}
            company={item.instituteName}
            startDate={item.startYear}
            endDate={item.currentlyStudying ? 'Present' : item.endYear}
            editable
            key={index}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default EditEducationForm;
