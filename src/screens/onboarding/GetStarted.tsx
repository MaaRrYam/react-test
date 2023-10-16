import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {useFormik} from 'formik';
import {Button, Input} from '@/components';
import {commonStyles} from '@/styles/onboarding';
import {GetStartedScreenProps} from '@/types';
import {getStartedSchema} from '@/utils/schemas/onboarding';
import {UserInterface} from '@/interfaces';
import {SCREEN_NAMES} from '@/constants';
import LoadingScreen from '@/components/Loading';
import OnboardingService from '@/services/onboarding';
import useUserManagement from '@/hooks/useUserManagement';

const GetStarted: React.FC<GetStartedScreenProps> = ({navigation}) => {
  const {user} = useUserManagement();
  const [userData, setUserData] = useState<UserInterface>({});
  const [initialValues, setInitialValues] = useState({
    username: user.username || '',
    city: user.city || '',
    state: user.state || '',
    country: user.country || '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmitUserData = formValues => {
    const newData = {...formValues, onboardingStep: 0};
    setUserData(prev => ({
      ...prev,
      ...newData,
    }));
    OnboardingService.getStarted(newData);
    navigation.navigate(SCREEN_NAMES.Education);
  };

  const {values, touched, errors, handleChange, handleSubmit, setFieldTouched} =
    useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema: getStartedSchema,
      onSubmit: formValues => {
        handleSubmitUserData(formValues);
      },
    });

  useEffect(() => {
    (async () => {
      OnboardingService.fetchUserData().then(setUserData);
    })();
  }, []);

  useEffect(() => {
    OnboardingService.setScreen(navigation, setIsLoading, userData);
  }, [userData]);

  useEffect(() => {
    setInitialValues({
      username: user.username || '',
      city: user.city || '',
      state: user.state || '',
      country: user.country || '',
    });
  }, [user]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <KeyboardAvoidingView style={commonStyles.container}>
      <SafeAreaView>
        <View>
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
            placeholder="Country"
            value={values.country}
            onChangeText={handleChange('country')}
            touched={touched.country}
            error={errors.country}
            name="country"
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
          <Input
            placeholder="City"
            value={values.city}
            onChangeText={handleChange('city')}
            touched={touched.city}
            error={errors.city}
            name="city"
            setFieldTouched={setFieldTouched}
          />
        </View>
        <View style={commonStyles.footer}>
          <Button title="Continue" onPress={handleSubmit} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default GetStarted;
