import React, {useState} from 'react';

import {View, SafeAreaView} from 'react-native';
import {Header, Button} from '@/components';
import {JobsScreenProps} from '@/types';
import {jobMainStyles} from '@/styles/jobs';
import {COLORS, JOBS_TABS} from '@/constants';
import JobsComponent from './JobsComponent';
import PastApplications from './PastApplications';
import SavedJobs from './SavedJobs';
import {ScrollView} from 'react-native-gesture-handler';

const Jobs: React.FC<JobsScreenProps> = ({navigation}) => {
  const [selectedTab, setSelectedTab] = React.useState<string>(JOBS_TABS[0]);
  const [jobFilterBottomSheet, setJobsFilterBottomSheet] = useState(false);

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
          />
        ) : selectedTab === JOBS_TABS[1] ? (
          <PastApplications />
        ) : (
          <SavedJobs />
        )}
      </SafeAreaView>
    </View>
  );
};
export default Jobs;
