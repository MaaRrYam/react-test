import {
  StyleSheet,
  Text,
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

const Jobs = ({navigation}: any) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [allJobs, setAllJobs] = useState<JobInterface[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobInterface>({});

  const handleJobPress = (item: JobInterface) => {
    setSelectedJob(item);
    setIsBottomSheetVisible(true);
  };

  useEffect(() => {
    JobsService.getAllJobs().then(setAllJobs);
  }, []);

  return (
    <>
      <ScrollView>
        <SafeAreaView style={styles.SafeAreaView}>
          <View>
            <Header navigation={navigation} />
            <FlatList
              data={allJobs}
              renderItem={({item}) => (
                <JobsCard
                  jobTitle={item?.jobTitle}
                  companyName={item?.companyName}
                  companyLogo={item?.companyLogo}
                  jobLocation={item?.jobLocation}
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
