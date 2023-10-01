import { ScrollView, View } from 'react-native';
import React from 'react';
import { CareerCard } from '@/components';
import { EducationProps } from '@/interfaces';

interface EducationTabProps {
  educationList: Array<EducationProps>;
}

const EducationTab = ({ educationList }: EducationTabProps) => {
  return (
    <ScrollView>
      {educationList.map((item, index) => (
        <View
          key={index}
          style={{
            paddingHorizontal: 20,
            borderBottomColor: index === educationList.length - 1 ? 'transparent' : '#E4E4E4',
            borderBottomWidth: index === educationList.length - 1 ? 0 : 1,
          }}
        >
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

export default EducationTab;
