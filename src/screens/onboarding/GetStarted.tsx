import React, {useEffect, useState, useLayoutEffect} from 'react';
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
import {
  Asset,
  GetStartedCity,
  GetStartedCountryState,
  GetStartedState,
  ImageInterface,
  UserInterface,
} from '@/interfaces';
import LoadingScreen from '@/components/Loading';
import OnboardingService from '@/services/onboarding';
import useUserManagement from '@/hooks/useUserManagement';
import {launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CameraSvg} from '@/assets/icons';
import {Select} from '@mobile-reality/react-native-select-pro';
import {
  Country,
  State,
  City,
  IState,
  ICountry,
  ICity,
} from 'country-state-city';
import ToastService from '@/services/toast';

const GetStarted: React.FC<GetStartedScreenProps> = ({navigation}) => {
  const {user} = useUserManagement();

  const [userData, setUserData] = useState<UserInterface>(
    user ? user : ({} as UserInterface),
  );
  const countries: ICountry[] = Country.getAllCountries();
  const [allCountries, setAllCountries] = useState<GetStartedCountryState[]>(
    [],
  );
  const [selectedCountry, setSelectedCountry] =
    useState<GetStartedCountryState>({} as GetStartedCountryState);
  const [allStates, setAllStates] = useState<GetStartedState[]>([]);
  const [selectedState, setSelectedState] = useState<GetStartedState>(
    {} as GetStartedState,
  );
  const [allCities, setAllCities] = useState<GetStartedCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<GetStartedCity>(
    {} as GetStartedCity,
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
      console.log(selectedState, selectedCity);
      const newData = {
        ...formValues,
        country: selectedCountry.label,
        countryDetails: selectedCountry.value,
        state:
          allStates.length && selectedState.label ? selectedState?.label : '',
        stateDetails:
          allStates.length > 0 && selectedState.value
            ? selectedState?.value
            : {},
        city:
          allCities.length > 0 && selectedCity.label ? selectedCity?.label : '',
        cityDetails:
          allCities.length > 0 && selectedCity.value ? selectedCity?.value : {},
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
      if (!user?.id) {
        OnboardingService.fetchUserData().then(res => {
          if (res) {
            setUserData(res);
          }
        });
      }
    })();
  }, [user]);

  useEffect(() => {
    const countriesArr: {
      label: string;
      value: ICountry;
    }[] = [];

    countries?.map(ct => {
      countriesArr.push({label: ct?.name, value: ct});
    });
    setAllCountries(countriesArr);
  }, [countries]);

  useEffect(() => {
    const states: IState[] = State.getStatesOfCountry(
      selectedCountry?.value?.isoCode,
    );
    const statesArr: GetStartedState[] = [];
    states?.map(st => {
      statesArr.push({label: st?.name, value: st});
    });
    setAllStates(statesArr);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const cities: ICity[] = City.getCitiesOfState(
        selectedCountry?.value?.isoCode,
        selectedState?.value?.isoCode,
      );
      const citiesArr: GetStartedCity[] = [];
      cities?.map(city => {
        citiesArr.push({label: city?.name, value: city});
      });
      setAllCities(citiesArr);
    }
  }, [selectedCountry, selectedState]);

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
    <SafeAreaView style={commonStyles.safeArea}>
      <KeyboardAvoidingView
        style={commonStyles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={commonStyles.container}>
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

          <Select
            styles={commonStyles.searchablecontainer}
            options={allCountries}
            animation={true}
            searchable={true}
            onSelect={option => {
              setSelectedCountry(option);
            }}
            placeholderText={'Select Country'}
            onRemove={() => {
              setSelectedCountry({} as GetStartedCountryState);
            }}
          />

          {!!allStates?.length && (
            <View style={commonStyles.searchablecontainer}>
              <Select
                styles={commonStyles.searchablecontainer}
                options={allStates}
                animation={true}
                searchable={true}
                onSelect={option => {
                  setSelectedState(option);
                }}
                placeholderText={'Select State'}
                onRemove={() => {
                  setSelectedState({} as GetStartedState);
                }}
              />
            </View>
          )}

          {!!allCities?.length && (
            <View style={commonStyles.searchablecontainer}>
              <Select
                styles={commonStyles.searchablecontainer}
                options={allCities}
                animation={true}
                searchable={true}
                onSelect={option => {
                  setSelectedCity(option);
                }}
                placeholderText={'Select City'}
                onRemove={() => {
                  setSelectedCity({} as GetStartedCity);
                }}
              />
            </View>
          )}
          <View style={commonStyles.footer}>
            <PrimaryButton title="Continue" onPress={handleSubmit} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GetStarted;
