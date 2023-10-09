import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Input from '../../components/Inputs/Input';
import {COLORS, experience, jobTypes, workEnviroment} from '../../constants';
import {CheckMark} from '../../assets/icons';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

const JobsFilterForm = ({
  selectedFilters,
  setSelectedFilters,
  applyFilters,
  searchTerm,
  setSearchTerm,
  setFilteredJobs,
  isResetVisible,
  setIsResetVisible,
  setJobsFilterBottomSheet,
}) => {
  const toggleFilter = (key, value) => {
    const filter = {[key]: value};
    const filterIndex = selectedFilters.findIndex(
      f => JSON.stringify(f) === JSON.stringify(filter),
    );

    if (filterIndex === -1) {
      setSelectedFilters([...selectedFilters, filter]);
    } else {
      setSelectedFilters(
        selectedFilters.filter((_, index) => index !== filterIndex),
      );
    }
    setIsResetVisible(selectedFilters.length > 0 || searchTerm !== '');
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    setSearchTerm('');
    setIsResetVisible(false);
    setFilteredJobs([]);
    setJobsFilterBottomSheet(false);
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.SafeAreaView}>
        <View>
          {isResetVisible && (
            <TouchableOpacity onPress={resetFilters}>
              <Text>Reset All Filters</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.title}>Location</Text>
          <Input
            style={styles.inputfield}
            placeholder="City/State"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Text style={styles.title}>Job Type</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              marginTop: 5,
            }}>
            {jobTypes.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleFilter('employmentType', option)}
                style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    {
                      width: 24,
                      height: 24,
                      borderColor: COLORS.white,
                      backgroundColor: selectedFilters.some(filter => {
                        return Object.values(filter).includes(option);
                      })
                        ? COLORS.primary
                        : COLORS.lightGrayBackground,
                    },
                  ]}>
                  {selectedFilters.some(filter => {
                    return Object.values(filter).includes(option);
                  }) && <CheckMark />}
                </View>
                <Text style={styles.checkboxValues}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.title}>Experience</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              marginTop: 5,
            }}>
            {experience.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleFilter('experience', option)}
                style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    {
                      width: 24,
                      height: 24,
                      borderColor: COLORS.white,
                      backgroundColor: selectedFilters.some(filter => {
                        return Object.values(filter).includes(option);
                      })
                        ? COLORS.primary
                        : COLORS.lightGrayBackground,
                    },
                  ]}>
                  {selectedFilters.some(filter => {
                    return Object.values(filter).includes(option);
                  }) && <CheckMark />}
                </View>
                <Text style={styles.checkboxValues}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.title}>Work Enviroment</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              marginTop: 5,
            }}>
            {workEnviroment.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleFilter('workplaceType', option)}
                style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    {
                      width: 24,
                      height: 24,
                      borderColor: COLORS.white,
                      backgroundColor: selectedFilters.some(filter => {
                        return Object.values(filter).includes(option);
                      })
                        ? COLORS.primary
                        : COLORS.lightGrayBackground,
                    },
                  ]}>
                  {selectedFilters.some(filter => {
                    return Object.values(filter).includes(option);
                  }) && <CheckMark />}
                </View>
                <Text style={styles.checkboxValues}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.applyButtonContainer}>
          <PrimaryButton title="Apply" onPress={applyFilters} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  inputfield: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: 20,
    color: 'black',
  },
  checkboxValues: {
    fontSize: 15,
    fontWeight: 'normal',
    paddingLeft: 10,
    marginTop: 10,
    color: 'black',
  },
  applyButtonContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 40,
  },
});

export default JobsFilterForm;
