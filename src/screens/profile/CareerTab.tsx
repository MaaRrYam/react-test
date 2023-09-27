import {View} from 'react-native';
import React from 'react';
import {CareerCard} from '@/components';
interface CareerTabProps {
  careerList: Array<any>;
}
const CareerTab = ({careerList}: CareerTabProps) => {
  return (
    <View>
      {careerList?.map(item => (
        <CareerCard
          title={item.role}
          company={item.companyName}
          startDate={item.startYear}
          endDate={
            item.endYear === new Date().getFullYear().toString()
              ? 'Present'
              : item.endYear
          }
        />
      ))}
    </View>
  );
};

export default CareerTab;
