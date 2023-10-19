import {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView, Image} from 'react-native';
import {Button, BottomSheet} from '@/components';
import {
  ApplicantInterface,
  JobsDetailFormInterface,
  UserInterface,
} from '@/interfaces';
import {jobDetailFormStyles} from '@/styles/jobs';
import {
  BaseSalary,
  Compensation,
  Location,
  SaveIcon,
  UnsaveIcon,
} from '@/assets/icons/index';

import React from 'react';
import JobsService from '@/services/jobs';
import LoadingScreen from '@/components/Loading';
import ToastService from '@/services/toast';
import JobQuestionsForm from '@/components/Forms/JobQuestionsForm';
import {TouchableOpacity} from 'react-native-gesture-handler';

const JobsDetailForm = ({
  selectedJob,
  setAllJobs,
  setIsBottomSheetVisible,
}: JobsDetailFormInterface) => {
  const [posterJobInfo, setPosterJobInfo] = useState<UserInterface>();
  const [isQABottomSheetOpen, setIsQABottomSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnDisable, setIsBtnDisable] = useState(false);
  const [checkApplied, setCheckApplied] = useState([]);
  const [checkExisitngApplications, setCheckExistingApplications] = useState<
    ApplicantInterface[]
  >([]);
  const [btnTitle, setBtnTitle] = useState('Apply');
  const [saved, setSaved] = useState(false);
  const [isLoadingPosterJob, setIsLoadingPosterJob] = useState(true);
  const [isLoadingCheckApplied, setIsLoadingCheckApplied] = useState(true);
  const [
    isLoadingCheckExistingApplications,
    setIsLoadingCheckExistingApplications,
  ] = useState(true);
  const [isLoadingSaved, setIsLoadingSaved] = useState(true);

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

  const handleSaveJob = async () => {
    if (saved) {
      JobsService.unSaveJob(selectedJob?.id).then(() => {
        setSaved(false);
        setAllJobs(prevJobs => {
          const updatedJobs = prevJobs.filter(
            job => job?.id !== selectedJob?.id,
          );
          return updatedJobs;
        });
      });
    } else {
      JobsService.saveJob(selectedJob?.id).then(res => {
        setSaved(true);
      });
    }
  };

  useEffect(() => {
    JobsService.getPosterJob(selectedJob?.posterJobID!).then(data => {
      setPosterJobInfo(data);
      setIsLoadingPosterJob(false);
    });

    JobsService.checkAppliedForJob(selectedJob?.id!).then(data => {
      setCheckApplied(data);
      setIsLoadingCheckApplied(false);
    });

    JobsService.checkExistingJobApplication().then(data => {
      setCheckExistingApplications(data);
      setIsLoadingCheckExistingApplications(false);
    });

    JobsService.checkSavedJob(selectedJob?.id).then(data => {
      setSaved(data);
      setIsLoadingSaved(false);
    });
  }, []);

  useEffect(() => {
    if (
      !isLoadingPosterJob &&
      !isLoadingCheckApplied &&
      !isLoadingCheckExistingApplications &&
      !isLoadingSaved
    ) {
      if (checkApplied.length > 0) {
        setIsBtnDisable(true);
        setBtnTitle('Applied');
      }
      setIsLoading(false);
    }
  }, [
    isLoadingPosterJob,
    isLoadingCheckApplied,
    isLoadingCheckExistingApplications,
    isLoadingSaved,
    checkApplied,
  ]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView>
          <SafeAreaView style={jobDetailFormStyles.SafeAreaView}>
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <Text style={jobDetailFormStyles.jobTitle}>
                    {selectedJob.jobTitle}
                  </Text>
                  <Text style={jobDetailFormStyles.companyName}>
                    {selectedJob.companyName}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleSaveJob}
                  style={{paddingRight: 30}}>
                  {saved ? <SaveIcon /> : <UnsaveIcon />}
                </TouchableOpacity>
              </View>

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
              {posterJobInfo?.name && (
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
