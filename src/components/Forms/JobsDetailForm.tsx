import {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView, Image} from 'react-native';
import {Button, BottomSheet} from '@/components';
import {
  ApplicantInterface,
  JobsDetailFormInterface,
  UserInterface,
} from '@/interfaces';
import {jobDetailFormStyles} from '@/styles/jobs';
import {BaseSalary, Compensation, Location} from '@/assets/icons/index';

import React from 'react';
import JobsService from '@/services/jobs';
import LoadingScreen from '@/components/Loading';
import ToastService from '@/services/toast';
import JobQuestionsForm from '@/components/Forms/JobQuestionsForm';

const JobsDetailForm = ({
  selectedJob,
  setIsBottomSheetVisible,
}: JobsDetailFormInterface) => {
  const [posterJobInfo, setPosterJobInfo] = useState<UserInterface>({});
  const [isQABottomSheetOpen, setIsQABottomSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnDisable, setIsBtnDisable] = useState(false);
  const [checkApplied, setCheckApplied] = useState([]);
  const [checkExisitngApplications, setCheckExistingApplications] = useState<
    ApplicantInterface[]
  >([]);
  const [btnTitle, setBtnTitle] = useState('Apply');

  const handleOnPress = () => {
    if (checkExisitngApplications.length >= 3) {
      ToastService.showError('Cannot Apply to more than 3 jobs');
      setIsBtnDisable(true);
    } else {
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
            ToastService.showError(
              'An Error occured while applying to the job',
            );
          });
      }
    }
  };

  useEffect(() => {
    JobsService.getPosterJob(selectedJob?.posterJobID!).then(setPosterJobInfo);
    JobsService.checkAppliedForJob(selectedJob?.id!).then(setCheckApplied);
    JobsService.checkExistingJobApplication().then(
      setCheckExistingApplications,
    );
  }, []);

  useEffect(() => {
    if (checkApplied.length > 0) {
      setIsBtnDisable(true);
      setBtnTitle('Applied');
    }

    if (checkApplied?.length >= 0 || checkExisitngApplications?.length >= 0) {
      setIsLoading(false);
    }
  }, [checkApplied, checkExisitngApplications]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          <SafeAreaView style={jobDetailFormStyles.SafeAreaView}>
            <View>
              <Text style={jobDetailFormStyles.jobTitle}>
                {selectedJob.jobTitle}
              </Text>
              <Text style={jobDetailFormStyles.companyName}>
                {selectedJob.companyName}
              </Text>

              <View style={jobDetailFormStyles.basicDetails}>
                <View style={jobDetailFormStyles.basicDetailItem}>
                  <Location />
                  <Text style={jobDetailFormStyles.basicDetailItem}>
                    {selectedJob?.workplaceType}: {selectedJob?.companyLocation}
                  </Text>
                </View>
                <View style={jobDetailFormStyles.basicDetailItem}>
                  <Compensation />
                  <Text style={jobDetailFormStyles.basicDetailItem}>
                    Total Compensation: ${selectedJob?.jobCompensation}
                  </Text>
                </View>
                <View style={jobDetailFormStyles.basicDetailItem}>
                  <BaseSalary />
                  <Text style={jobDetailFormStyles.basicDetailItem}>
                    Base Salary: ${selectedJob?.baseSalary}
                  </Text>
                </View>
              </View>
              {posterJobInfo && (
                <View style={jobDetailFormStyles.recruiterContainer}>
                  <Image
                    style={jobDetailFormStyles.recruiterImage}
                    source={{uri: posterJobInfo?.photoUrl}}
                  />
                  <Text style={jobDetailFormStyles.recruiterDetail}>
                    {posterJobInfo?.name} is hiring for this position
                  </Text>
                </View>
              )}
              <View style={jobDetailFormStyles.applyButtonContainer}>
                <Button
                  disabled={isBtnDisable}
                  title={btnTitle}
                  onPress={handleOnPress}
                />
              </View>
              <View style={jobDetailFormStyles.jobDetailContainer}>
                <Text style={jobDetailFormStyles.jobDetailHeading}>
                  Summary
                </Text>
                <Text style={jobDetailFormStyles.JobsDetailText}>
                  {selectedJob.jobSummary}
                </Text>
                <Text style={jobDetailFormStyles.jobDetailHeading}>
                  Responsibilites
                </Text>
                <Text style={jobDetailFormStyles.JobsDetailText}>
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

export default JobsDetailForm;
