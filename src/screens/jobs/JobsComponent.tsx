import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import {BottomSheet, Loading} from '@/components';
import {jobMainStyles} from '@/styles/jobs';
import {JobInterface, JobsComponentInterface} from '@/interfaces';
import JobsDetailForm from '@/components/Forms/JobsDetailForm';
import JobsCard from '@/components/Cards/JobsCard';
import JobsFilterForm from '@/components/Forms/JobsFilterForm';
import EmptyComponent from '@/components/NoResults/Empty';
import {FlashList} from '@shopify/flash-list';

const JobsComponent = ({
  jobFilterBottomSheet,
  setJobsFilterBottomSheet,
  allJobs,
  setAllJobs,
  isLoading,
}: JobsComponentInterface) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobInterface>({});
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<JobInterface[]>([]);
  const [isResetVisible, setIsResetVisible] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleJobPress = (item: JobInterface) => {
    setSelectedJob(item);
    setIsBottomSheetVisible(true);
    setJobsFilterBottomSheet(false);
  };

  const applyFilters = () => {
    setJobsFilterBottomSheet(false);
    const filteredJobs = allJobs.filter(job => {
      return selectedFilters.every(filter => {
        const [key, value] = Object.entries(filter)[0];
        return job[key] === value;
      });
    });

    const filteredJobsWithSearch = filteredJobs.filter(job => {
      return Object.values(job).some(field => {
        if (typeof field === 'string') {
          return field.toLowerCase().includes(searchTerm?.toLowerCase());
        }
        return false;
      });
    });
    setIsResetVisible(selectedFilters.length > 0 || searchTerm !== '');
    setFilteredJobs(filteredJobsWithSearch);
    setFiltersApplied(true);
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    setSearchTerm('');
    setIsResetVisible(false);
    setFilteredJobs([]);
    setJobsFilterBottomSheet(false);
    setFiltersApplied(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={jobMainStyles.SafeAreaView}>
          {isResetVisible && (
            <>
              <View style={jobMainStyles.filterView}>
                <Text style={jobMainStyles.filterText}>Search Results</Text>
                <TouchableOpacity onPress={resetFilters}>
                  <Text>Reset All Filters</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {!filtersApplied &&
            allJobs &&
            !filteredJobs.length &&
            !searchTerm && (
              <FlashList
                data={allJobs}
                renderItem={({item}) => (
                  <JobsCard
                    jobTitle={item?.jobTitle!}
                    companyName={item?.companyName!}
                    companyLogo={item?.companyLogo}
                    jobLocation={item?.workplaceType!}
                    companyLocation={item?.companyLocation!}
                    onPress={() => handleJobPress(item)}
                  />
                )}
                keyExtractor={item => item?.id?.toString()!}
                estimatedItemSize={100}
              />
            )}

          {filteredJobs.length > 0 && (
            <FlashList
              data={filteredJobs}
              renderItem={({item}) => (
                <JobsCard
                  jobTitle={item?.jobTitle!}
                  companyName={item?.companyName!}
                  companyLogo={item?.companyLogo}
                  jobLocation={item?.workplaceType!}
                  companyLocation={item?.companyLocation!}
                  onPress={() => handleJobPress(item)}
                />
              )}
              keyExtractor={item => item?.id?.toString()!}
              estimatedItemSize={100}
            />
          )}

          {filteredJobs.length <= 0 &&
            (selectedFilters.length || searchTerm) &&
            filtersApplied && (
              <View style={jobMainStyles.emptyContainer}>
                <EmptyComponent />
              </View>
            )}

          {isBottomSheetVisible && (
            <BottomSheet
              isVisible={isBottomSheetVisible}
              onClose={() => setIsBottomSheetVisible(false)}
              snapPoints={['90%', '98%']}>
              <ScrollView>
                <JobsDetailForm
                  selectedJob={selectedJob}
                  setAllJobs={setAllJobs}
                  setIsBottomSheetVisible={setIsBottomSheetVisible}
                />
              </ScrollView>
            </BottomSheet>
          )}
          {jobFilterBottomSheet && (
            <BottomSheet
              isVisible={isBottomSheetVisible}
              onClose={() => setIsBottomSheetVisible(false)}
              snapPoints={['90%', '100%']}>
              <ScrollView>
                <JobsFilterForm
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  applyFilters={applyFilters}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setIsResetVisible={setIsResetVisible}
                />
              </ScrollView>
            </BottomSheet>
          )}
        </View>
      )}
    </>
  );
};

export default JobsComponent;
