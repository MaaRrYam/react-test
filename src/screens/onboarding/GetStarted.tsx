import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useFormik} from 'formik';
import FastImage from 'react-native-fast-image';

import {PrimaryButton, Input} from '@/components';
import {commonStyles} from '@/styles/onboarding';
import {GetStartedScreenProps} from '@/types';
import {getStartedSchema} from '@/utils/schemas/onboarding';
import {Asset, ImageInterface, UserInterface} from '@/interfaces';
import {SCREEN_NAMES} from '@/constants';
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
  const [userData, setUserData] = useState<UserInterface>({});
  const countries: ICountry[] = Country.getAllCountries();
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  const [allStates, setAllStates] = useState([]);
  const [selectedState, setSelectedState] = useState<IState>();
  const [allCities, setAllCities] = useState();
  const [selectedCity, setSelectedCity] = useState<ICity>();
  const [initialValues, setInitialValues] = useState({
    username: user.username || '',
    city: user.city || '',
    state: user.state || '',
    country: user.country || '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<
    ImageInterface | Asset | null
  >(null);

  const handleSubmitUserData = formValues => {
    if (!selectedCountry) {
      ToastService.showError('Please Select Your Country');
    } else if (!selectedState) {
      ToastService.showError('Please Select Your State');
    } else if (!selectedCity) {
      ToastService.showError('Please Select Your City');
    } else {
      const newData = {
        ...formValues,
        country: selectedCountry?.label,
        countryDetails: selectedCountry?.value,
        state: selectedState?.label,
        stateDetails: selectedState?.value,
        city: selectedCity?.label,
        cityDetails: selectedCity?.value,
        onboardingStep: 0,
      };
      setUserData(prev => ({
        ...prev,
        ...newData,
      }));

      OnboardingService.getStarted(newData, selectedImage);
      navigation.navigate(SCREEN_NAMES.Education);
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
      OnboardingService.fetchUserData().then(res => {
        setUserData(res);
      });
    })();
  }, []);

  useEffect(() => {
    const countriesArr = [];
    countries?.map((ct, index) => {
      countriesArr.push({label: ct?.name, value: ct});
    });
    setAllCountries(countriesArr);
  }, [countries]);

  useEffect(() => {
    const states: IState[] = State.getStatesOfCountry(
      selectedCountry?.value?.isoCode,
    );
    const statesArr = [];
    states?.map((st, index) => {
      statesArr.push({label: st?.name, value: st});
    });
    setAllStates(statesArr);
  }, [selectedCountry]);

  useEffect(() => {
    const cities: ICity[] = City.getCitiesOfState(
      selectedCountry?.value?.isoCode,
      selectedState?.value?.isoCode,
    );
    const citiesArr = [];
    cities?.map((city, index) => {
      citiesArr.push({label: city?.name, value: city});
    });
    setAllCities(citiesArr);
  }, [selectedState]);

  useEffect(() => {
    OnboardingService.setScreen(navigation, setIsLoading, userData);
    setSelectedImage(userData?.photoUrl);
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
    <SafeAreaView style={commonStyles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
          <Text style={commonStyles.title}>Let's get you started,</Text>
          <TouchableOpacity
            style={commonStyles.imageContainer}
            onPress={() => openImagePicker()}>
            {selectedImage?.uri ? (
              <FastImage
                style={commonStyles.image}
                source={{
                  uri: selectedImage?.uri,
                  priority: 'normal',
                  cache: FastImage.cacheControl.immutable,
                }}
                resizeMode="cover"
              />
            ) : selectedImage ? (
              <FastImage
                style={commonStyles.image}
                source={{
                  uri: selectedImage?.uri,
                  priority: 'normal',
                  cache: FastImage.cacheControl.immutable,
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

          <View>
            <Select
              styles={commonStyles.searchablecontainer}
              options={allCountries}
              searchable={true}
              onSelect={(option, index) => {
                setSelectedCountry(option);
              }}
              placeholderText={'Country'}
              onRemove={() => {
                setSelectedCountry({});
              }}
            />
          </View>

          <>
            {allStates.length > 0 && (
              <View style={commonStyles.searchablecontainer}>
                <Select
                  styles={commonStyles.searchablecontainer}
                  options={allStates}
                  searchable={true}
                  onSelect={(option, index) => {
                    setSelectedState(option);
                  }}
                  placeholderText={'State'}
                  onRemove={() => {
                    setSelectedState({});
                  }}
                />
              </View>
            )}
          </>

          <>
            {allCities?.length > 0 && (
              <View style={commonStyles.searchablecontainer}>
                <Select
                  styles={commonStyles.searchablecontainer}
                  options={allCities}
                  searchable={true}
                  onSelect={(option, index) => {
                    setSelectedCity(option);
                  }}
                  placeholderText={'City'}
                  onRemove={() => {
                    setSelectedCity({});
                  }}
                />
              </View>
            )}
          </>
        </View>
        <View style={commonStyles.footer}>
          <PrimaryButton title="Continue" onPress={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GetStarted;
