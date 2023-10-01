import { ScrollView, View } from 'react-native';
import React from 'react';
import { CareerCard } from '@/components';
import { EmploymentProps } from '@/interfaces'
interface CareerTabProps {
  careerList: Array<EmploymentProps>;
}
const CareerTab = ({ careerList }: CareerTabProps) => {
  return (
    <ScrollView scrollEnabled>
      {careerList?.map(item => (
        <View style={{paddingHorizontal: 20,borderBottomColor: '#E4E4E4', borderBottomWidth: 1}}>
          <CareerCard
            title={item.role}
            company={item.companyName}
            startDate={item.startYear}
            endDate={item.currentlyWorking ? 'Present' : item.endYear}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default CareerTab;
