import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {EmploymentProps} from '@/interfaces';
import {CareerCard} from '../Cards';
import {FONTS} from '@/constants';
import {Input, Checkbox} from '../Inputs';

interface CareerFormProps {
  careerList: Array<EmploymentProps>;
}
const EditCareerForm: React.FC<CareerFormProps> = ({careerList}) => {
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View>
      {isVisible ? (
        <View style={{paddingHorizontal: 20}}>
          <Text
            style={{
              color: 'black',
              marginBottom: 24,
              fontWeight: 'bold',
              fontSize: FONTS.largeLabel,
            }}>
            Job Details
          </Text>
          <Input
            onChangeText={setCompanyName}
            placeholder="Current Company"
            value={companyName}
            name="Company Name"
          />
          <Input
            onChangeText={setRole}
            placeholder="Designation"
            value={role}
            name="Role"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Input
              onChangeText={setStartYear}
              placeholder="Start Year"
              value={startYear}
              name="Start Name"
              style={{width: 156}}
            />
            <Input
              onChangeText={setEndYear}
              placeholder="End Year"
              value={endYear}
              name="End Name"
              style={{width: 156}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Checkbox
              onPress={setIsCurrentlyWorking}
              isChecked={isCurrentlyWorking}
            />

            <Text style={{color: 'black', marginLeft: 20}}>
              Currently Studying?
            </Text>
          </View>
        </View>
      ) : (
        careerList?.map((item, index) => (
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
              onEdit={() => setIsVisible(true)}
            />
          </View>
        ))
      )}
    </View>
  );
};

export default EditCareerForm;
