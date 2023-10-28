import React, {useEffect, useState} from 'react';

import {View, SafeAreaView} from 'react-native';
import {Header, PrimaryButton} from '@/components';
import {JobsScreenProps} from '@/types';
import {jobMainStyles} from '@/styles/jobs';
import {COLORS, JOBS_TABS} from '@/constants';
import JobsComponent from '@/screens/jobs/JobsComponent';
import PastApplications from '@/screens/jobs/PastApplications';
import {JobInterface} from '@/interfaces';
import JobsService from '@/services/jobs';

const Jobs: React.FC<JobsScreenProps> = ({navigation}) => {
  const [selectedTab, setSelectedTab] = React.useState<string>(JOBS_TABS[0]);
  const [jobFilterBottomSheet, setJobsFilterBottomSheet] = useState(false);
  const [allJobs, setAllJobs] = useState<JobInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchFilteredJobs, setSearchFilteredJobs] = useState(allJobs)
  useEffect(() => {
    if (selectedTab === JOBS_TABS[0]) {
      if (!allJobs?.length) {
        setIsLoading(true);
        JobsService.getAllJobs().then(setAllJobs);
        JobsService.getAllJobs().then(setSearchFilteredJobs);
      } else {
        setIsLoading(false);
      }
    } else if (selectedTab === JOBS_TABS[1]) {
      if (!allJobs?.length) {
        setIsLoading(true);
        JobsService.getAllPastApplicationsAndJobs()
          .then(response => {
            setAllJobs(response);
            setIsDataFetched(true);
          })
          .catch(() => {
            setIsDataFetched(false);
          });
      } else {
        setIsLoading(false);
      }
    } else if (selectedTab === JOBS_TABS[2]) {
      if (!allJobs?.length) {
        setIsLoading(true);
        JobsService.getAllSavedJobs().then(setAllJobs);
      } else {
        setIsLoading(false);
      }
    }
  }, [allJobs, selectedTab]);

  useEffect(() => {
    setAllJobs([]);
  }, [selectedTab]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setSearchFilteredJobs(allJobs);
    } else {
      const filteredItems = allJobs.filter(item => {
        if (typeof item.jobTitle === 'string') {
          return item.jobTitle.toLowerCase().includes(searchText.toLowerCase());
        }
      });
      setSearchFilteredJobs(filteredItems);
    }
  }, [allJobs, searchText]);

  return (
    <SafeAreaView style={jobMainStyles.outerContainer}>
      <View style={jobMainStyles.SafeAreaView}>
        <Header
          navigation={navigation}
          setJobsFilterBottomSheet={setJobsFilterBottomSheet}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <View style={jobMainStyles.subHeader}>
          <PrimaryButton
            title={JOBS_TABS[0]}
            onPress={() => setSelectedTab(JOBS_TABS[0])}
            backgroundColor={COLORS.lightBackground}
            textColor={COLORS.black}
            style={
              selectedTab === JOBS_TABS[0]
                ? jobMainStyles.selectedButtonStyles
                : jobMainStyles.buttonStyles
            }
          />
          <PrimaryButton
            title={JOBS_TABS[1]}
            onPress={() => setSelectedTab(JOBS_TABS[1])}
            backgroundColor={COLORS.lightBackground}
            textColor={COLORS.black}
            style={
              selectedTab === JOBS_TABS[1]
                ? jobMainStyles.selectedButtonStyles
                : jobMainStyles.buttonStyles
            }
          />
          <PrimaryButton
            title={JOBS_TABS[2]}
            onPress={() => setSelectedTab(JOBS_TABS[2])}
            backgroundColor={COLORS.lightBackground}
            textColor={COLORS.black}
            style={
              selectedTab === JOBS_TABS[2]
                ? jobMainStyles.selectedButtonStyles
                : jobMainStyles.buttonStyles
            }
          />
        </View>
        {selectedTab === JOBS_TABS[0] ? (
          <JobsComponent
            jobFilterBottomSheet={jobFilterBottomSheet}
            setJobsFilterBottomSheet={setJobsFilterBottomSheet}
            allJobs={searchFilteredJobs}
            setAllJobs={setAllJobs}
            isLoading={isLoading}
          />
        ) : selectedTab === JOBS_TABS[1] ? (
          <PastApplications allJobs={allJobs} isDataFetched={isDataFetched} />
        ) : (
          <JobsComponent
            jobFilterBottomSheet={jobFilterBottomSheet}
            setJobsFilterBottomSheet={setJobsFilterBottomSheet}
            allJobs={allJobs}
            setAllJobs={setAllJobs}
            isLoading={isLoading}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default Jobs;
