import React from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {jobTypes, workEnviroment} from '@/constants';
import {JobsFilterFormInterface} from '@/interfaces';
import {Checkbox} from '@/components/Inputs';
import {jobsFilterFormStyles} from '@/styles/jobs';

import Input from '@/components/Inputs/Input';
import {Button} from '../Buttons';

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
          <View style={jobsFilterFormStyles.checkboxContainer}>
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
          <View style={jobsFilterFormStyles.checkboxContainer}>
            {workEnviroment.map(option => (
              <Checkbox
                onPress={() => toggleFilter('workplaceType', option)}
                isChecked={selectedFilters.some(filter => {
                  return Object.values(filter).includes(option);
                })}
                text={option}
              />
            ))}
          </View>
        </View>
        <View style={jobsFilterFormStyles.applyButtonContainer}>
          <Button title="Apply" onPress={applyFilters} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default JobsFilterForm;
