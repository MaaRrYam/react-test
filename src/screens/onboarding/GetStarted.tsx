import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useFormik} from 'formik';
import FastImage from 'react-native-fast-image';
import {
  Country,
  State,
  City,
  IState,
  ICountry,
  ICity,
} from 'country-state-city';
import DropDownPicker from 'react-native-dropdown-picker';

import Layout from './Layout';
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
import ToastService from '@/services/toast';
import {COLORS, FONTS} from '@/constants';

const GetStarted: React.FC<GetStartedScreenProps> = ({navigation}) => {
  const {user} = useUserManagement();

  const [userData, setUserData] = useState<UserInterface>(
    user ? user : ({} as UserInterface),
  );
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const countries: ICountry[] = Country.getAllCountries();
  const [allCountries, setAllCountries] = useState<GetStartedCountryState[]>(
    [],
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    userData?.country || '',
  );
  const [allStates, setAllStates] = useState<GetStartedState[]>([]);
  const [selectedState, setSelectedState] = useState<string>(
    userData?.state || '',
  );
  const [allCities, setAllCities] = useState<GetStartedCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>(
    userData?.city || '',
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
  }, [user]);

  useEffect(() => {
    const countriesArr: {
      label: string;
      value: string;
    }[] = [];

    countries?.map(ct => {
      countriesArr.push({label: ct?.name, value: ct.isoCode});
    });
    setAllCountries(countriesArr);
  }, [countries]);

  useEffect(() => {
    const states: IState[] = State.getStatesOfCountry(selectedCountry);
    const statesArr: GetStartedState[] = [];
    states?.map(st => {
      statesArr.push({label: st?.name, value: st.isoCode});
    });
    setAllStates(statesArr);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const cities: ICity[] = City.getCitiesOfState(
        selectedCountry,
        selectedState,
      );
      const citiesArr: GetStartedCity[] = [];
      cities?.map(city => {
        citiesArr.push({label: city?.name, value: city.name});
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
    <Layout title="Let's get you started">
      <View style={commonStyles.getStartedWrapper}>
        <ScrollView>
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

          <DropDownPicker
            open={isCountryDropdownOpen}
            value={selectedCountry}
            items={allCountries}
            setOpen={setIsCountryDropdownOpen}
            setValue={setSelectedCountry}
            searchable={true}
            placeholder="Select Country"
            style={commonStyles.searchablecontainer}
            containerStyle={commonStyles.searchContainerStyles}
            closeAfterSelecting={true}
            searchContainerStyle={commonStyles.searchInputContainerStyles}
            modalAnimationType="fade"
            dropDownContainerStyle={{
              borderColor: COLORS.border,
            }}
            listItemLabelStyle={{
              fontSize: FONTS.text,
              color: COLORS.text,
            }}
            searchTextInputStyle={commonStyles.searchTextInput}
            searchPlaceholder="Search Country"
            zIndex={10000}
          />

          <DropDownPicker
            open={isStateDropdownOpen}
            value={selectedState}
            items={allStates}
            setOpen={setIsStateDropdownOpen}
            setValue={setSelectedState}
            searchable={true}
            placeholder="Select State"
            style={commonStyles.searchablecontainer}
            containerStyle={commonStyles.searchContainerStyles}
            closeAfterSelecting={true}
            searchContainerStyle={commonStyles.searchInputContainerStyles}
            modalAnimationType="fade"
            dropDownContainerStyle={{
              borderColor: COLORS.border,
            }}
            listItemLabelStyle={{
              fontSize: FONTS.text,
              color: COLORS.text,
            }}
            searchTextInputStyle={commonStyles.searchTextInput}
            searchPlaceholder="Search State"
            zIndex={9900}
          />

          <DropDownPicker
            open={isCityDropdownOpen}
            value={selectedCity}
            items={allCities}
            setOpen={setIsCityDropdownOpen}
            setValue={setSelectedCity}
            searchable={true}
            placeholder="Select City"
            style={commonStyles.searchablecontainer}
            containerStyle={commonStyles.searchContainerStyles}
            closeAfterSelecting={true}
            searchContainerStyle={commonStyles.searchInputContainerStyles}
            modalAnimationType="fade"
            dropDownContainerStyle={{
              borderColor: COLORS.border,
            }}
            listItemLabelStyle={{
              fontSize: FONTS.text,
              color: COLORS.text,
            }}
            searchTextInputStyle={commonStyles.searchTextInput}
            searchPlaceholder="Search City"
            zIndex={9800}
          />
        </ScrollView>

        <View style={[commonStyles.footer, {paddingBottom: 0}]}>
          <PrimaryButton title="Continue" onPress={handleSubmit} />
        </View>
      </View>
    </Layout>
  );
};

export default GetStarted;
