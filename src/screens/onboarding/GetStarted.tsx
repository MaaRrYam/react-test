import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {useFormik} from 'formik';
import FastImage from 'react-native-fast-image';

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

const GetStarted: React.FC<GetStartedScreenProps> = ({navigation}) => {
  const {user} = useUserManagement();
  const [userData, setUserData] = useState<UserInterface>({} as UserInterface);
  const [initialValues, setInitialValues] = useState({
    username: '',
    city: '',
    state: '',
    country: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<
    ImageInterface | Asset | null
  >(null);

  const handleSubmitUserData = formValues => {
    const newData = {...formValues, onboardingStep: 0};
    setUserData(prev => ({
      ...prev,
      ...newData,
    }));
    OnboardingService.getStarted(newData, selectedImage);
    navigation.navigate('Education');
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
        maxHeight: 2000,
        maxWidth: 2000,
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
      OnboardingService.fetchUserData().then(res => {
        setUserData(res);
      });
    })();
  }, []);

  useEffect(() => {
    OnboardingService.setScreen(navigation, setIsLoading, userData);
    setSelectedImage(userData?.photoUrl);
  }, [userData]);

  useEffect(() => {
    setInitialValues({
      username: user?.username || '',
      city: user?.city || '',
      state: user?.state || '',
      country: user?.country || '',
    });
  }, [user]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <KeyboardAvoidingView
        style={commonStyles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={[commonStyles.container, {justifyContent: 'space-between'}]}>
          <View>
            <Text style={commonStyles.title}>Let's get you started,</Text>
            <TouchableOpacity
              style={commonStyles.imageContainer}
              onPress={() => openImagePicker()}>
              {user?.photoUrl ? (
                <FastImage
                  style={commonStyles.image}
                  source={{
                    uri: user.photoUrl,
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
            <PrimaryButton title="Continue" onPress={handleSubmit} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GetStarted;
