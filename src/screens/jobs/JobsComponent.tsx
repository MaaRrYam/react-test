import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BottomSheet, Loading} from '@/components';
import {jobMainStyles} from '@/styles/jobs';
import {JobInterface, JobsComponentInterface} from '@/interfaces';

import JobsDetailForm from '@/components/Forms/JobsDetailForm';
import JobsCard from '@/components/Cards/JobsCard';
import JobsFilterForm from '@/components/Forms/JobsFilterForm';
import EmptyComponent from '@/components/NoResults/Empty';

const JobsComponent = ({
  jobFilterBottomSheet,
  setJobsFilterBottomSheet,
  allJobs,
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
            filteredJobs.length <= 0 &&
            !searchTerm && (
              // Render the "All Jobs" section
              <FlatList
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
              />
            )}

          {filteredJobs.length > 0 && (
            // Render the filtered jobs
            <FlatList
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
            />
          )}

          {filteredJobs.length <= 0 &&
            (selectedFilters.length > 0 || searchTerm !== '') && (
              <View style={jobMainStyles.emptyContainer}>
                <EmptyComponent />
              </View>
            )}

          {isBottomSheetVisible && (
            <BottomSheet
              isVisible={isBottomSheetVisible}
              onClose={() => setIsBottomSheetVisible(false)}
              snapPoints={['60%', '100%']}>
              <JobsDetailForm
                selectedJob={selectedJob}
                setIsBottomSheetVisible={setIsBottomSheetVisible}
              />
            </BottomSheet>
          )}
          {jobFilterBottomSheet && (
            <BottomSheet
              isVisible={isBottomSheetVisible}
              onClose={() => setIsBottomSheetVisible(false)}
              snapPoints={['90%', '100%']}>
              <JobsFilterForm
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                applyFilters={applyFilters}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setIsResetVisible={setIsResetVisible}
              />
            </BottomSheet>
          )}
        </View>
      )}
    </>
  );
};

export default JobsComponent;
