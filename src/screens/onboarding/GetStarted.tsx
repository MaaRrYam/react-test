import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {BackButton, Button, Input} from '../../components';
import {commonStyles} from 'styles/onboarding';
import {GetStartedScreenProps} from 'types';
import {useFormik} from 'formik';
import {getStartedSchema} from 'utils/schemas';

const GetStarted: React.FC<GetStartedScreenProps> = ({navigation}) => {
  const initialValues = {
    username: '',
    city: '',
    state: '',
  };

  const {values, touched, errors, handleChange, handleSubmit} = useFormik({
    initialValues,
    validationSchema: getStartedSchema,
    onSubmit: values => {
      console.log(values);
      navigation.navigate('Education');
    },
  });

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        <BackButton onPress={() => console.log('Back button pressed')} />
        <Text style={commonStyles.title}>Let's get you started,</Text>

        <Input
          placeholder="Username"
          value={values.username}
          onChangeText={handleChange('username')}
          touched={touched.username}
          error={errors.username}
        />
        <Input
          placeholder="City"
          value={values.city}
          onChangeText={handleChange('city')}
          touched={touched.city}
          error={errors.city}
        />
        <Input
          placeholder="State"
          value={values.state}
          onChangeText={handleChange('state')}
          touched={touched.state}
          error={errors.state}
        />
      </View>
      <View style={commonStyles.footer}>
        <Button title="Continue" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
