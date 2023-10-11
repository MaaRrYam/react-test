import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, BottomSheet} from '@/components';
import JobsDetailForm from '@/components/Forms/JobsDetailForm';
import JobsService from '@/services/jobs/index';
import JobsCard from '@/components/Cards/JobsCard';
import {JobInterface} from '@/interfaces';
import {COLORS, PADDING} from '@/constants';
import JobsFilterForm from '@/components/Forms/JobsFilterForm';
import LoadingScreen from '@/components/Loading';
import {TouchableOpacity} from 'react-native-gesture-handler';
import EmptyComponent from '@/components/NoResults/Empty';

const Jobs = ({navigation}: any) => {
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
        <View style={styles.SafeAreaView}>
          <ScrollView>
            <SafeAreaView style={styles.SafeAreaView}>
              <View>
                <Header
                  navigation={navigation}
                  jobs={true}
                  setJobsFilterBottomSheet={setJobsFilterBottomSheet}
                />
                {isResetVisible && (
                  <>
                    <View style={styles.filterView}>
                      <Text style={styles.filterText}>Search Results</Text>
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
                        jobTitle={item?.jobTitle}
                        companyName={item?.companyName}
                        companyLogo={item?.companyLogo}
                        jobLocation={item?.workplaceType}
                        companyLocation={item?.companyLocation}
                        onPress={() => handleJobPress(item)}
                      />
                    )}
                    keyExtractor={item => item?.id?.toString()!}
                  />
                )}

                {!allJobs && selectedFilters.length <= 0 && !searchTerm && (
                  <View style={styles.emptyContainer}>
                    <EmptyComponent />
                  </View>
                )}

                {filteredJobs.length > 0 && (
                  <FlatList
                    data={filteredJobs}
                    renderItem={({item}) => (
                      <JobsCard
                        jobTitle={item?.jobTitle}
                        companyName={item?.companyName}
                        companyLogo={item?.companyLogo}
                        jobLocation={item?.workplaceType}
                        companyLocation={item?.companyLocation}
                        onPress={() => handleJobPress(item)}
                      />
                    )}
                    keyExtractor={item => item?.id?.toString()!}
                  />
                )}

                {(!filteredJobs && selectedFilters.length >= 0) ||
                  (searchTerm && (
                    <View style={styles.emptyContainer}>
                      <EmptyComponent />
                    </View>
                  ))}
              </View>
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
                setFilteredJobs={setFilteredJobs}
                isResetVisible={isResetVisible}
                setIsResetVisible={setIsResetVisible}
                setJobsFilterBottomSheet={setJobsFilterBottomSheet}
              />
            </BottomSheet>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingHorizontal: PADDING.general,
    flexDirection: 'row',
  },
  filterView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  filterText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 17,
  },
});
export default Jobs;
