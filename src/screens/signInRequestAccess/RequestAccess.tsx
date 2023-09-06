import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {useFormik} from 'formik';

import {BackButton, Button, Link, Input} from '@/components';
import {RequestAccessScreenProps} from '@/types';
import {commonStyles} from '@/styles/onboarding';
import {requestAccessSchema} from '@/utils/schemas';

const RequestAccess: React.FC<RequestAccessScreenProps> = ({navigation}) => {
  const {values, touched, handleChange, handleSubmit, errors, setFieldTouched} =
    useFormik({
      initialValues: {
        name: '',
        email: '',
        linkedInUrl: '',
        currentCompany: '',
        currentDesignation: '',
        contactNo: '',
      },
      validationSchema: requestAccessSchema,
      onSubmit: formValues => {
        console.log(formValues);
      },
    });

  const handleSignInClick = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        <BackButton onPress={() => console.log('Back button pressed')} />
        <Text style={commonStyles.title}>Request Access</Text>

        <ScrollView>
          <Input
            placeholder="Name"
            value={values.name}
            onChangeText={handleChange('name')}
            touched={touched.name}
            error={errors.name}
            name="name"
            setFieldTouched={setFieldTouched}
          />
          <Input
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            keyboardType="email-address"
            touched={touched.email}
            error={errors.email}
            name="email"
            setFieldTouched={setFieldTouched}
          />
          <Input
            placeholder="LinkedIn URL"
            value={values.linkedInUrl}
            onChangeText={handleChange('linkedInUrl')}
            touched={touched.linkedInUrl}
            error={errors.linkedInUrl}
            name="linkedInUrl"
            setFieldTouched={setFieldTouched}
          />
          <Input
            placeholder="Current Company"
            value={values.currentCompany}
            onChangeText={handleChange('currentCompany')}
            touched={touched.currentCompany}
            error={errors.currentCompany}
            name="currentCompany"
            setFieldTouched={setFieldTouched}
          />
          <Input
            placeholder="Current Designation"
            value={values.currentDesignation}
            onChangeText={handleChange('currentDesignation')}
            touched={touched.currentDesignation}
            error={errors.currentDesignation}
            name="currentDesignation"
            setFieldTouched={setFieldTouched}
          />
          <Input
            placeholder="Contact Number"
            value={values.contactNo}
            onChangeText={handleChange('contactNo')}
            keyboardType="numeric"
            touched={touched.contactNo}
            error={errors.contactNo}
            name="contactNo"
            setFieldTouched={setFieldTouched}
          />
        </ScrollView>
        <View style={commonStyles.footer}>
          <Button title="Continue" onPress={handleSubmit} />
          <Link
            text="Already have an account? Sign In"
            onPress={handleSignInClick}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RequestAccess;
