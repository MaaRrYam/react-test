import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useFormik} from 'formik';

import {Button, Input} from '@/components';
import {commonStyles} from '@/styles/onboarding';
import {GetStartedScreenProps} from '@/types';
import {getStartedSchema} from '@/utils/schemas/onboarding';
import FirebaseService from '@/services/Firebase';
import {UserInterface} from '@/interfaces';
import StorageService from '@/services/Storage';
import {SCREEN_NAMES} from '@/constants';
import {useAppSelector} from '@/hooks/useAppSelector';
import {RootState} from '@/store';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {setLoading, setLoadingFinished} from '@/store/features/loadingSlice';
import LoadingScreen from '@/components/Loading';

const GetStarted: React.FC<GetStartedScreenProps> = ({navigation}) => {
  const [userData, setUserData] = useState<UserInterface>({});
  const [userId, setUserId] = useState('');
  const [initialValues, setInitialValues] = useState({
    username: '',
    city: '',
    state: '',
  });
  const {isLoading} = useAppSelector((state: RootState) => state.loading);
  const dispatch = useAppDispatch();

  const handleSubmitUserData = formValues => {
    const newData = {
      ...{...formValues, onboardingStep: 0},
    };
    setUserData(newData);
    FirebaseService.updateDocument('users', userId, newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await StorageService.getItem('uid');
        setUserId(item);
        const data = await FirebaseService.getDocument('users', item);

        if (data) {
          setUserData(data);
          setInitialValues({
            username: data.username || '',
            city: data.city || '',
            state: data.state || '',
          });
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, []);

  const {values, touched, errors, handleChange, handleSubmit, setFieldTouched} =
    useFormik({
      initialValues,
      enableReinitialize: true, // Enable reinitialization when initialValues change
      validationSchema: getStartedSchema,
      onSubmit: formValues => {
        handleSubmitUserData(formValues);
        navigation.navigate(SCREEN_NAMES.Education);
      },
    });

  useEffect(() => {
    dispatch(setLoading());
    if (userData.onboardingStep === 0) {
      dispatch(setLoadingFinished());
    } else if (userData.onboardingStep === 1) {
      navigation.navigate('Education');
    } else if (userData.onboardingStep === 2) {
      navigation.navigate('Industry');
    } else if (userData.onboardingStep === 3) {
      navigation.navigate('Experience');
    } else if (userData.onboardingStep === 4) {
      navigation.navigate('EmploymentStatus');
    }
  }, [userData, dispatch]);

  // useEffect(() => {
  // }, [dispatch]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
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
