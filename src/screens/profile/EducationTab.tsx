import {View} from 'react-native';
import React from 'react';
import {CareerCard} from '@/components';
interface EducationTabProps {
  educationList: Array<any>;
}
const EducationTab = ({educationList}: EducationTabProps) => {
  const today = new Date();
  return (
    <View>
      {educationList.map(item => (
        <CareerCard
          title={item.degree}
          company={item.instituteName}
          startDate={item.startYear}
          endDate={
            item.endYear === today.getFullYear().toString()
              ? 'Present'
              : item.endYear
          }
        />
      ))}
    </View>
  );
};

export default EducationTab;
