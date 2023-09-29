import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useFormik} from 'formik';

import {PrimaryButton, Input} from '@/components';
import {commonStyles} from '@/styles/onboarding';
import {GetStartedScreenProps} from '@/types';
import {getStartedSchema} from '@/utils/schemas/onboarding';
import { SCREEN_NAMES } from '@/constants';

const GetStarted: React.FC<GetStartedScreenProps> = ({navigation}) => {
  const initialValues = {
    username: '',
    city: '',
    state: '',
  };

  const {values, touched, errors, handleChange, handleSubmit, setFieldTouched} =
    useFormik({
      initialValues,
      validationSchema: getStartedSchema,
      onSubmit: formValues => {
        console.log(formValues);
        navigation.navigate(SCREEN_NAMES.Education);
      },
    });

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
        <PrimaryButton title="Continue" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
