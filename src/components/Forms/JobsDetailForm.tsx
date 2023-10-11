import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import {useEffect, useState} from 'react';
import {PrimaryButton} from '@/components';
import React from 'react';
import Location from '@/assets/icons/Location';
import Compensation from '@/assets/icons/Compensation';
import BaseSalary from '@/assets/icons/BaseSalary';
import {JobsDetailFormInterface, UserInterface} from '@/interfaces';
import JobsService from '@/services/jobs';
import {setLoading, setLoadingFinished} from '@/store/features/loadingSlice';
import LoadingScreen from '@/components/Loading';
import ToastService from '@/services/toast';
import {BottomSheet} from '@/components';
import JobQuestionsForm from '@/components/Forms/JobQuestionsForm';

const JobsDetailForm = ({
  selectedJob,
  setIsBottomSheetVisible,
}: JobsDetailFormInterface) => {
  const [posterJobInfo, setPosterJobInfo] = useState<UserInterface>();
  const [isQABottomSheetOpen, setIsQABottomSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnDisable, setIsBtnDisable] = useState(false);

  const handleOnPress = () => {
    if (
      selectedJob?.customQuestions?.length! > 0 &&
      (selectedJob?.customQuestions![0] ||
        selectedJob?.customQuestions![1] ||
        selectedJob?.customQuestions![2])
    ) {
      setIsQABottomSheetOpen(true);
    } else {
      setIsBtnDisable(true);
      JobsService.applyForJob(selectedJob?.id!)
        .then(() => {
          setIsBottomSheetVisible(false);
          ToastService.showSuccess('Applied to the Job Successfully');
        })
        .catch(() => {
          ToastService.showError('An Error occured while applying to the job');
        });
    }
  };

  useEffect(() => {
    JobsService.getPosterJob(selectedJob?.posterJobID!).then(setPosterJobInfo);
  }, []);

  useEffect(() => {
    if (posterJobInfo !== null) {
      setIsLoading(false);
    }
  }, [posterJobInfo]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          <SafeAreaView style={styles.SafeAreaView}>
            <View>
              <Text style={styles.jobTitle}>{selectedJob.jobTitle}</Text>
              <Text style={styles.companyName}>{selectedJob.companyName}</Text>

              <View style={styles.basicDetails}>
                <View style={styles.basicDetailItem}>
                  <Location />
                  <Text style={styles.basicDetailItem}>
                    {selectedJob.workplaceType}: {selectedJob.companyLocation}
                  </Text>
                </View>
                <View style={styles.basicDetailItem}>
                  <Compensation />
                  <Text style={styles.basicDetailItem}>
                    Total Compensation: ${selectedJob.jobCompensation}
                  </Text>
                </View>
                <View style={styles.basicDetailItem}>
                  <BaseSalary />
                  <Text style={styles.basicDetailItem}>
                    Base Salary: ${selectedJob.baseSalary}
                  </Text>
                </View>
              </View>
              {posterJobInfo && (
                <View style={styles.recruiterContainer}>
                  <Image
                    style={styles.recruiterImage}
                    source={{uri: posterJobInfo?.photoUrl}}
                  />
                  <Text style={styles.recruiterDetail}>
                    {posterJobInfo?.name} is hiring for this position
                  </Text>
                </View>
              )}
              <View style={styles.applyButtonContainer}>
                <PrimaryButton
                  disabled={isBtnDisable}
                  title="Apply"
                  onPress={handleOnPress}
                />
              </View>
              <View style={styles.jobDetailContainer}>
                <Text style={styles.jobDetailHeading}>Summary</Text>
                <Text style={styles.JobsDetailText}>
                  {selectedJob.jobSummary}
                </Text>
                <Text style={styles.jobDetailHeading}>Responsibilites</Text>
                <Text style={styles.JobsDetailText}>
                  {selectedJob.responsibilities}
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
      {isQABottomSheetOpen && (
        <BottomSheet
          isVisible={isQABottomSheetOpen}
          onClose={() => setIsQABottomSheetOpen(false)}
          snapPoints={['20%', '90%']}>
          <JobQuestionsForm
            selectedJob={selectedJob}
            setIsQABottomSheetOpen={setIsQABottomSheetOpen}
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
  },
  jobTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: 20,
    color: 'black',
  },
  companyName: {
    fontSize: 15,
    fontWeight: 'normal',
    paddingLeft: 20,
    marginTop: 3,
    color: 'black',
  },
  basicDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  basicDetailItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 15,
    marginLeft: 4,
    color: 'black',
  },
  recruiterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  recruiterImage: {
    width: 40,
    marginTop: 30,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  recruiterDetail: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: 25,
    color: 'black',
  },
  applyButtonContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 40,
  },
  jobDetailContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    color: 'black',
  },
  jobDetailHeading: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 18,
    color: 'black',
  },
  JobsDetailText: {
    fontSize: 15,
    color: 'black',
    paddingRight: 30,
  },
});

export default JobsDetailForm;
