import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, jobTypes, workEnviroment} from '@/constants';
import {CheckMark} from '@/assets/icons';
import {JobsFilterFormInterface} from '@/interfaces';
import {Checkbox} from '@/components/Inputs';
import {jobsFilterFormStyles} from '@/styles/jobs';

import Input from '@/components/Inputs/Input';
import PrimaryButton from '@/components/Buttons/PrimaryButton';

const JobsFilterForm = ({
  selectedFilters,
  setSelectedFilters,
  applyFilters,
  searchTerm,
  setSearchTerm,
  setIsResetVisible,
}: JobsFilterFormInterface) => {
  const toggleFilter = (key: String, value: String) => {
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

  return (
    <ScrollView>
      <SafeAreaView style={jobsFilterFormStyles.SafeAreaView}>
        <View>
          <Text style={jobsFilterFormStyles.title}>Location</Text>
          <Input
            style={jobsFilterFormStyles.inputfield}
            placeholder="City/State"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Text style={jobsFilterFormStyles.title}>Job Type</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              marginTop: 5,
            }}>
            {jobTypes.map(option => (
              <Checkbox
                onPress={() => toggleFilter('employmentType', option)}
                isChecked={selectedFilters.some(filter => {
                  return Object.values(filter).includes(option);
                })}
                text={option}
              />
            ))}
          </View>

          <Text style={jobsFilterFormStyles.title}>Work Enviroment</Text>
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
                style={jobsFilterFormStyles.checkboxContainer}>
                <View
                  style={[
                    jobsFilterFormStyles.checkbox,
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
                <Text style={jobsFilterFormStyles.checkboxValues}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={jobsFilterFormStyles.applyButtonContainer}>
          <PrimaryButton title="Apply" onPress={applyFilters} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default JobsFilterForm;
