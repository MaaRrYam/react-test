import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useFormik} from 'formik';

import {Button, Input} from '@/components';
import {commonStyles} from '@/styles/onboarding';
import {GetStartedScreenProps} from '@/types';
import {getStartedSchema} from '@/utils/schemas/onboarding';
import FirebaseService from '@/services/Firebase';
import {UserInterface} from '@/interfaces';

const GetStarted: React.FC<GetStartedScreenProps> = ({navigation}) => {
  const uid = 'RG3OIhPdY0VG937IN3R40ud0Dml1';
  const [userData, setUserData] = useState<UserInterface>({});

  const initialValues = {
    username: '',
    city: '',
    state: '',
  };

  const handleSubmitUserData = formValues => {
    console.warn(userData);
    // console.log(formValues);
    setUserData(prevState => ({
      ...prevState,
      ...formValues,
    }));

    // FirebaseService.updateDocument('users', uid, userData);
  };

  const {values, touched, errors, handleChange, handleSubmit, setFieldTouched} =
    useFormik({
      initialValues,
      validationSchema: getStartedSchema,
      onSubmit: formValues => {
        handleSubmitUserData(formValues);
        // navigation.navigate('Education');
      },
    });

  useEffect(() => {
    const data = FirebaseService.getDocument('users', uid);
    console.log(data);
    setUserData(data);
  }, []);

  // useEffect(() => {
  //   console.warn(userData);
  // }, [userData]);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Let's get you started,</Text>

        <Input
          placeholder="Username"
          value={values.username}
          onChangeText={handleChange('username')}
          touched={touched.username}
          error={errors.username}
          name="username"
          setFieldTouched={setFieldTouched}
        />
        <Input
          placeholder="City"
          value={values.city}
          onChangeText={handleChange('city')}
          touched={touched.city}
          error={errors.city}
          name="city"
          setFieldTouched={setFieldTouched}
        />
        <Input
          placeholder="State"
          value={values.state}
          onChangeText={handleChange('state')}
          touched={touched.state}
          error={errors.state}
          name="state"
          setFieldTouched={setFieldTouched}
        />
      </View>
      <View style={commonStyles.footer}>
        <Button title="Continue" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
