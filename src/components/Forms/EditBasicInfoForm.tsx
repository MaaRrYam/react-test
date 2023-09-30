import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Dropdown, Input, LocationDropdown} from '@/components';
import {EmploymentProps, UserInterface} from '@/interfaces';

interface UserInfoProps {
  user: UserInterface;
}
const EditBasicInfoForm = ({user}: UserInfoProps) => {
  const [name, setName] = useState<string>(user.name);
  const [about, setAbout] = useState<string>(user.description);
  const [country, setCountry] = useState<string>(user.country);
  const [state, setState] = useState<string>(user.state);
  const [city, setCity] = useState<string>(user.city);
  const createArrayOfStringsFromEmploymentList = (list: EmploymentProps[]) => {
    return list.map(
      employment => ` ${employment.role} at ${employment.companyName}`,
    );
  };

  const options = createArrayOfStringsFromEmploymentList(
    user.employmentList as EmploymentProps[],
  );

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
        Basic Information
      </Text>
      <Input
        name="Name"
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      <Input
        name="About"
        placeholder="About"
        onChangeText={setAbout}
        value={about}
        style={{height: 106}}
      />
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
        Current Position
      </Text>
      <Dropdown
        options={options}
        style={{marginTop: 10}}
        startingOption={user.tagline ? user.tagline : 'Tagline'}
      />
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
        Current Position
      </Text>

      <Input
        name="Country"
        placeholder="Country"
        onChangeText={setCountry}
        value={country}
      />

      <Input
        name="State"
        placeholder="State"
        onChangeText={setState}
        value={state}
      />

      <Input
        name="City"
        placeholder="City"
        onChangeText={setCity}
        value={city}
      />
    </ScrollView>
  );
};

export default EditBasicInfoForm;
