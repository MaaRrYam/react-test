import {ScrollView, View} from 'react-native';
import React from 'react';
import {CareerCard} from '@/components';
import {EducationProps} from '@/interfaces';
interface EducationTabProps {
  educationList: Array<EducationProps>;
}
const EducationTab = ({educationList}: EducationTabProps) => {
  return (
    <ScrollView>
      {educationList.map(item => (
        <View style={{paddingHorizontal: 20,borderBottomColor: '#E4E4E4', borderBottomWidth: 1}}>
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
