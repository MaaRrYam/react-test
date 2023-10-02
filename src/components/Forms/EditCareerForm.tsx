import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {EmploymentProps} from '@/interfaces';
import {CareerCard} from '../Cards';
import {FONTS} from '@/constants';
import {Input, Checkbox} from '../Inputs';
import {PrimaryButton} from '../Buttons';

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
              onEdit={() => {
                setIsVisible(true);
                setCompanyName(item.companyName);
                setEndYear(item.currentlyWorking ? item.endYear as string : '');
                setIsCurrentlyWorking(
                  item.currentlyWorking ? item.currentlyWorking : false,
                );
                setStartYear(item.startYear);
                setRole(item.role);
              }}
            />
          </View>
        ))
      )}
      {isVisible && (
        <View style={styles.footer}>
          <PrimaryButton
            title="Save"
            onPress={() => {}}
            style={styles.saveButton}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderTopColor: '#E4E4E4',
    borderTopWidth: 1,
    paddingHorizontal: 20,
    marginTop: 260,
  },
  saveButton: {
    marginTop: 10,
  },
});

export default EditCareerForm;
