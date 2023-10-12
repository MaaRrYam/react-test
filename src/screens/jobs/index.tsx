import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, ScrollView, FlatList, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Header, BottomSheet} from '@/components';
import {JobInterface} from '@/interfaces';
import {JobsScreenProps} from '@/types';
import {jobMainStyles} from '@/styles/jobs';

import JobsDetailForm from '@/components/Forms/JobsDetailForm';
import JobsService from '@/services/jobs/index';
import JobsCard from '@/components/Cards/JobsCard';
import JobsFilterForm from '@/components/Forms/JobsFilterForm';
import LoadingScreen from '@/components/Loading';
import EmptyComponent from '@/components/NoResults/Empty';

const Jobs: React.FC<JobsScreenProps> = ({navigation}) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [allJobs, setAllJobs] = useState<JobInterface[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobInterface>({});
  const [jobFilterBottomSheet, setJobsFilterBottomSheet] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<JobInterface[]>([]);
  const [isResetVisible, setIsResetVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    setSearchTerm('');
    setIsResetVisible(false);
    setFilteredJobs([]);
    setJobsFilterBottomSheet(false);
  };

  useEffect(() => {
    if (allJobs.length === 0) {
      setIsLoading(true);
      JobsService.getAllJobs().then(setAllJobs);
    } else {
      setIsLoading(false);
    }
  }, [allJobs]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={jobMainStyles.SafeAreaView}>
          <ScrollView>
            <SafeAreaView style={jobMainStyles.SafeAreaView}>
              <Header
                navigation={navigation}
                jobs={true}
                setJobsFilterBottomSheet={setJobsFilterBottomSheet}
              />
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
              {allJobs && selectedFilters.length <= 0 && !searchTerm && (
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

              {!allJobs && selectedFilters.length <= 0 && !searchTerm && (
                <View style={jobMainStyles.emptyContainer}>
                  <EmptyComponent />
                </View>
              )}

              {filteredJobs.length > 0 && (
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
            </SafeAreaView>
          </ScrollView>
          {isBottomSheetVisible && (
            <BottomSheet
              isVisible={isBottomSheetVisible}
              onClose={() => setIsBottomSheetVisible(false)}
              snapPoints={['20%', '90%']}>
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
export default Jobs;
