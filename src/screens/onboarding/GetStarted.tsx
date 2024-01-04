import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useFormik} from 'formik';
import FastImage from 'react-native-fast-image';
import useCountryStateCity from '@/hooks/useCountryStateCity';

import Layout from './Layout';
import {PrimaryButton, Input} from '@/components';
import {commonStyles} from '@/styles/onboarding';
import {GetStartedScreenProps} from '@/types';
import {getStartedSchema} from '@/utils/schemas/onboarding';
import {Asset, ImageInterface, UserInterface} from '@/interfaces';
import LoadingScreen from '@/components/Loading';
import OnboardingService from '@/services/onboarding';
import useUserManagement from '@/hooks/useUserManagement';
import {launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CameraSvg} from '@/assets/icons';
import ToastService from '@/services/toast';

const GetStarted: React.FC<GetStartedScreenProps> = ({navigation}) => {
  const {user} = useUserManagement();
  const {
    renderUI,
    selectedCity,
    selectedCountry,
    selectedState,
    setSelectedCity,
    setSelectedCountry,
    setSelectedState,
    allCities,
    allStates,
  } = useCountryStateCity();

  const [userData, setUserData] = useState<UserInterface>(
    user ? user : ({} as UserInterface),
  );
  const [initialValues, setInitialValues] = useState({
    username: user?.username || '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<
    ImageInterface | Asset | null
  >(null);

  const handleSubmitUserData = (formValues: {username: string}) => {
    if (Object.keys(selectedCountry).length === 0) {
      ToastService.showError('Please Select Your Country');
    } else if (
      allStates.length > 0 &&
      Object.keys(selectedState).length === 0
    ) {
      ToastService.showError('Please Select Your State');
    } else if (allCities.length > 0 && Object.keys(selectedCity).length === 0) {
      ToastService.showError('Please Select Your City');
    } else {
      const newData = {
        ...formValues,
        country: selectedCountry,
        state: allStates.length && selectedState ? selectedState : '',
        stateDetails:
          allStates.length > 0 && selectedState ? selectedState : '',
        city: allCities.length > 0 && selectedCity ? selectedCity : '',
        cityDetails: allCities.length > 0 && selectedCity ? selectedCity : '',
        onboardingStep: 1,
      };
      setUserData(
        prev =>
          ({
            ...prev,
            ...newData,
          } as any),
      );

      OnboardingService.getStarted(newData, selectedImage);
      navigation.navigate('Education');
    }
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

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 300,
        maxWidth: 300,
      },
      response => {
        if (response.errorCode) {
          console.log('Image picker error: ', response.errorMessage);
        } else {
          if (response.assets && response.assets.length) {
            let imageUri = response.assets[0];
            setSelectedImage(imageUri);
          }
        }
      },
    );
  };

  useEffect(() => {
    (async () => {
      if (!user?.id) {
        OnboardingService.fetchUserData().then(res => {
          if (res) {
            setUserData(res);
            setSelectedCountry(res.country || '');
            setSelectedState(res.state || '');
            setSelectedCity(res.city || '');
          }
        });
      }
    })();
  }, [setSelectedCity, setSelectedCountry, setSelectedState, user]);

  useLayoutEffect(() => {
    OnboardingService.setScreen(navigation, setIsLoading, userData);
    setSelectedImage(userData?.photoUrl || null);
    setInitialValues({
      username: userData?.username || '',
    });
  }, [navigation, userData]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Layout title="Let's get you started">
      <View style={commonStyles.getStartedWrapper}>
        <ScrollView>
          <TouchableOpacity
            style={commonStyles.imageContainer}
            onPress={() => openImagePicker()}>
            {userData?.photoUrl ? (
              <FastImage
                style={commonStyles.image}
                source={{
                  uri: userData.photoUrl,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
                resizeMode="cover"
              />
            ) : selectedImage?.uri ? (
              <Image
                style={commonStyles.image}
                source={{
                  uri: selectedImage?.uri,
                }}
                resizeMode="cover"
              />
            ) : selectedImage ? (
              <Image
                style={commonStyles.image}
                source={{
                  uri: selectedImage?.uri,
                }}
                resizeMode="cover"
              />
            ) : (
              <View style={commonStyles.cameraImage}>
                <CameraSvg />
              </View>
            )}
          </TouchableOpacity>
          <Text style={commonStyles.imageText}>Add Profile Picture</Text>
          <Input
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
            touched={touched.username}
            error={errors.username}
            name="username"
            setFieldTouched={setFieldTouched}
          />

          {renderUI()}
        </ScrollView>

        <View style={[commonStyles.footer, {paddingBottom: 0}]}>
          <PrimaryButton title="Continue" onPress={handleSubmit} />
        </View>
      </View>
    </Layout>
  );
};

export default GetStarted;
