import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {EducationProps} from '@/interfaces';
import {CareerCard} from '../Cards';
import {BottomSheet, Checkbox, Input} from '@/components';
import {FONTS} from '@/constants';
interface EditEducationProps {
  educationList: Array<EducationProps>;
}

const EditEducationForm = ({educationList}: EditEducationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [instituteName, setInstituteName] = useState('');
  const [degreeName, setDegreeName] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(true);
  return (
    <ScrollView>
      {isVisible ? (
        <View style={{paddingHorizontal: 20}}>
          <Text
            style={{
              color: 'black',
              marginBottom: 24,
              fontWeight: 'bold',
              fontSize: FONTS.largeLabel,
            }}>
            Education Details
          </Text>
          <Input
            onChangeText={setInstituteName}
            placeholder="Institute Name"
            value={instituteName}
            name="Institute Name"
          />
          <Input
            onChangeText={setDegreeName}
            placeholder="Degree Name"
            value={degreeName}
            name="Degree Name"
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
        educationList.map((item, index) => (
          <View
            style={{
              paddingHorizontal: 20,
              borderBottomColor:
                index === educationList.length - 1 ? 'transparent' : '#E4E4E4',
              borderBottomWidth: index === educationList.length - 1 ? 0 : 1,
            }}>
            <CareerCard
              title={item.degree}
              company={item.instituteName}
              startDate={item.startYear}
              endDate={item.currentlyStudying ? 'Present' : item.endYear}
              editable
              key={index}
              onEdit={() => setIsVisible(true)}
            />
          </View>
        ))
      )}
    </ScrollView>
  );
};
export default EditEducationForm;
