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
          editable
        />
      ))}
    </View>
  );
};

export default EditCareerForm;
