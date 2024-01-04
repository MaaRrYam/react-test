import React, {useCallback, useEffect, useState} from 'react';
import {
  Country,
  State,
  City,
  IState,
  ICountry,
  ICity,
} from 'country-state-city';
import DropDownPicker from 'react-native-dropdown-picker';

import {commonStyles} from '@/styles/onboarding';
import {
  GetStartedCity,
  GetStartedCountryState,
  GetStartedState,
} from '@/interfaces';
import useUserManagement from '@/hooks/useUserManagement';
import {COLORS, FONTS} from '@/constants';

const useCountryStateCity = () => {
  const {user} = useUserManagement();

  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const countries: ICountry[] = Country.getAllCountries();
  const [allCountries, setAllCountries] = useState<GetStartedCountryState[]>(
    [],
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    user?.country || '',
  );
  const [allStates, setAllStates] = useState<GetStartedState[]>([]);
  const [selectedState, setSelectedState] = useState<string>(user?.state || '');
  const [allCities, setAllCities] = useState<GetStartedCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>(user?.city || '');

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

  const renderUI = useCallback(() => {
    return (
      <>
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
      </>
    );
  }, [
    allCities,
    allCountries,
    allStates,
    isCityDropdownOpen,
    isCountryDropdownOpen,
    isStateDropdownOpen,
    selectedCity,
    selectedCountry,
    selectedState,
  ]);

  return {
    renderUI,
    selectedCountry,
    selectedState,
    selectedCity,
    setSelectedCity,
    setSelectedCountry,
    setSelectedState,
    allStates,
    allCities,
    allCountries,
  };
};

export default useCountryStateCity;
