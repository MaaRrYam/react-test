import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown, Input, LocationDropdown} from '@/components';
import {useAppSelector} from '@/hooks/useAppSelector';
import {RootState} from '@/store';
import {EmploymentProps} from '@/interfaces';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {getUser} from '@/store/features/authSlice';

const EditBasicInfoForm = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const {user} = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  const createArrayOfStringsFromEmploymentList = (list: EmploymentProps[]) => {
    return list.map(
      employment => ` ${employment.role} at ${employment.companyName}`,
    );
  };

  const options = createArrayOfStringsFromEmploymentList(user.employmentList);

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
        startingOption="Tagline"
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
