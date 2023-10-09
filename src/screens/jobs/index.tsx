import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, BottomSheet} from '../../components';
import JobsDetailForm from '../../components/Forms/JobsDetailForm';
import JobsService from '../../services/jobs/index';
import JobsCard from '../../components/Cards/JobsCard';
import {JobInterface} from '../../interfaces';
import {COLORS} from '../../constants';
import JobsFilterForm from '../../components/Forms/JobsFilterForm';
import LoadingScreen from '../../components/Loading';

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

    setFilteredJobs(filteredJobsWithSearch);
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
        <>
          <ScrollView>
            <SafeAreaView style={styles.SafeAreaView}>
              <View>
                <Header
                  navigation={navigation}
                  jobs={true}
                  setJobsFilterBottomSheet={setJobsFilterBottomSheet}
                />
                <FlatList
                  data={filteredJobs.length > 0 ? filteredJobs : allJobs}
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
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
export default Jobs;
