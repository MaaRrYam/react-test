import {View, Text} from 'react-native';
import React from 'react';
import {EducationProps} from '@/interfaces';
import {CareerCard} from '../Cards';

interface EditEducationProps {
  educationList: Array<EducationProps>;
}
const EditEducationForm = ({educationList}: EditEducationProps) => {
  const today = new Date();
  return (
    <View>
      {educationList.map((item, index) => (
        <CareerCard
          title={item.degree}
          company={item.instituteName}
          startDate={item.startYear}
          endDate={
            item.endYear === today.getFullYear().toString()
              ? 'Present'
              : item.endYear
          }
          editable
          key={index}
        />
      ))}
    </View>
  );
};

export default EditEducationForm;
