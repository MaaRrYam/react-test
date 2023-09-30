import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity, // Import TouchableOpacity for item clicks
} from 'react-native';
import axios from 'axios';

const LocationDropdowns: React.FC = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
 const [countrySelected, setCountrySelected] = useState(false);
 const [stateSelected, setStateSelected] = useState(false);
 const [citySelected, setCitySelected] = useState(false);
  const [countrySearch, setCountrySearch] = useState<string>('');
  const [stateSearch, setStateSearch] = useState<string>('');
  const [citySearch, setCitySearch] = useState<string>('');

  const countryInputRef = useRef(null); // Create ref for country input
  const stateInputRef = useRef(null); // Create ref for state input
  const cityInputRef = useRef(null); // Create ref for city input

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const countryNames = response.data.map(
          (country: any) => country.name.common,
        );
        setCountries(countryNames);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(`https://api.statesapi.com/v1/${selectedCountry}/state`)
        .then((response) => {
          const stateNames = response.data.map((state: any) => state.name);
          setStates(stateNames);
          setSelectedState(null);
        })
        .catch((error) => {
          console.error('Error fetching states:', error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      axios
        .get(`https://your-city-api.com?state=${selectedState}`)
        .then((response) => {
          const cityNames = response.data.map((city: any) => city.name);
          setCities(cityNames);
          setSelectedCity(null);
        })
        .catch((error) => {
          console.error('Error fetching cities:', error);
        });
    }
  }, [selectedState]);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleCountryItemClick = (country: string) => {
    setSelectedCountry(country);
    setCountrySearch(country);
    setCountrySelected(true);
    countryInputRef.current?.blur(); // Hide keyboard
  };

  const handleStateItemClick = (state: string) => {
    setSelectedState(state);
    setStateSearch(state);
    setStateSelected(true);
    stateInputRef.current?.blur(); // Hide keyboard
  };

  const handleCityItemClick = (city: string) => {
    setSelectedCity(city);
    setCitySearch(city);
    setCitySelected(true);
    cityInputRef.current?.blur(); // Hide keyboard
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Search input for countries */}
        <TextInput
          ref={countryInputRef} // Assign the ref
          style={styles.searchInput}
          placeholder="Search for a country"
          value={countrySearch}
          onChangeText={(text) => setCountrySearch(text)}
        />

        {/* List of countries */}
        {!countrySelected && filteredCountries.map((country, index) => (
          <TouchableOpacity
            key={index}
            style={styles.listItem}
            onPress={() => handleCountryItemClick(country)} // Call the handler
          >
            <Text style={{color:'black'}}>{country}</Text>
          </TouchableOpacity>
        ))}

        {/* Add spacing between input fields */}
        <View style={styles.spacing} />

        {/* Search input for states */}
        <TextInput
          ref={stateInputRef} // Assign the ref
          style={styles.searchInput}
          placeholder="Search for a state"
          value={stateSearch}
          onChangeText={(text) => setStateSearch(text)}
        />

        {/* List of states */}
        {!stateSelected && filteredStates.map((state, index) => (
          <TouchableOpacity
            key={index}
            style={styles.listItem}
            onPress={() => handleStateItemClick(state)} // Call the handler
          >
            <Text style={{color:'black'}}>{state}</Text>
          </TouchableOpacity>
        ))}

        {/* Add spacing between input fields */}
        <View style={styles.spacing} />

        {/* Search input for cities */}
        <TextInput
          ref={cityInputRef} // Assign the ref
          style={styles.searchInput}
          placeholder="Search for a city"
          value={citySearch}
          onChangeText={(text) => setCitySearch(text)}
        />

        {/* List of cities */}
        {!citySelected && filteredCities.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={styles.listItem}
            onPress={() => handleCityItemClick(city)} // Call the handler
          >
            <Text style={{color:'black'}}>{city}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
  },
  listItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
    color: 'black',
  },
  spacing: {
    marginBottom: 20,
  },
});

export default LocationDropdowns;
