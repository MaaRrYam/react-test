import {View} from 'react-native';
import React from 'react';
import {EmploymentProps} from '@/interfaces';
import {CareerCard} from '../Cards';

interface CareerFormProps {
  careerList: Array<EmploymentProps>;
}
const EditCareerForm: React.FC<CareerFormProps> = ({careerList}) => {
  return (
    <View>
      {careerList?.map((item, index) => (
        <View
          style={{
            paddingHorizontal: 20,
            borderBottomColor:
              index === careerList.length - 1 ? 'transparent' : '#E4E4E4',
            borderBottomWidth: index === careerList.length - 1 ? 0 : 1,
          }}>
          <CareerCard
            title={item.role}
            company={item.companyName}
            startDate={item.startYear}
            endDate={item.currentlyWorking ? 'Present' : item.endYear}
            editable
          />
        </View>
      ))}
    </View>
  );
};

export default EditCareerForm;
