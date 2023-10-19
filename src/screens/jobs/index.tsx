import React, {useEffect, useState} from 'react';

import {View, SafeAreaView} from 'react-native';
import {Header, Button} from '@/components';
import {JobsScreenProps} from '@/types';
import {jobMainStyles} from '@/styles/jobs';
import {COLORS, JOBS_TABS} from '@/constants';
import JobsComponent from './JobsComponent';
import PastApplications from './PastApplications';
import {JobInterface} from '@/interfaces';
import JobsService from '@/services/jobs';
import FirebaseService from '@/services/Firebase';

const Jobs: React.FC<JobsScreenProps> = ({navigation}) => {
  const [selectedTab, setSelectedTab] = React.useState<string>(JOBS_TABS[0]);
  const [jobFilterBottomSheet, setJobsFilterBottomSheet] = useState(false);
  const [allJobs, setAllJobs] = useState<JobInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedTab === JOBS_TABS[0]) {
      if (allJobs?.length === 0) {
        setIsLoading(true);
        JobsService.getAllJobs().then(setAllJobs);
      } else {
        setIsLoading(false);
      }
    } else if (selectedTab === JOBS_TABS[1]) {
      // if (allJobs?.length === 0) {
      //   setIsLoading(true);
      //   JobsService.getAllPastApplications().then(setAllJobs);
      // } else {
      //   setIsLoading(false);
      // }
    } else if (selectedTab === JOBS_TABS[2]) {
      if (allJobs?.length === 0) {
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

  return (
    <View style={jobMainStyles.outerContainer}>
      <SafeAreaView style={jobMainStyles.SafeAreaView}>
        <Header
          navigation={navigation}
          jobs={true}
          setJobsFilterBottomSheet={setJobsFilterBottomSheet}
        />
        <View style={jobMainStyles.subHeader}>
          <Button
            title={JOBS_TABS[0]}
            onPress={() => setSelectedTab(JOBS_TABS[0])}
            backgroundColor={'#F4F4F4'}
            textColor={COLORS.black}
            style={
              selectedTab === JOBS_TABS[0]
                ? jobMainStyles.selectedButtonStyles
                : jobMainStyles.buttonStyles
            }
          />
          <Button
            title={JOBS_TABS[1]}
            onPress={() => setSelectedTab(JOBS_TABS[1])}
            backgroundColor={'#F4F4F4'}
            textColor={COLORS.black}
            style={
              selectedTab === JOBS_TABS[1]
                ? jobMainStyles.selectedButtonStyles
                : jobMainStyles.buttonStyles
            }
          />
          <Button
            title={JOBS_TABS[2]}
            onPress={() => setSelectedTab(JOBS_TABS[2])}
            backgroundColor={'#F4F4F4'}
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
            allJobs={allJobs}
            isLoading={isLoading}
          />
        ) : selectedTab === JOBS_TABS[1] ? (
          // <PastApplications />
          <JobsComponent
            jobFilterBottomSheet={jobFilterBottomSheet}
            setJobsFilterBottomSheet={setJobsFilterBottomSheet}
            allJobs={allJobs}
            isLoading={isLoading}
          />
        ) : (
          <JobsComponent
            jobFilterBottomSheet={jobFilterBottomSheet}
            setJobsFilterBottomSheet={setJobsFilterBottomSheet}
            allJobs={allJobs}
            isLoading={isLoading}
          />
        )}
      </SafeAreaView>
    </View>
  );
};
export default Jobs;
