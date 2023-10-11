import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {useFormik} from 'formik';

import {PrimaryButton, Input} from '@/components';
import {commonStyles} from '@/styles/onboarding';
import {JobQuestionsFormInterface} from '@/interfaces';
import {jobCustomQuestionSchema} from '@/utils/schemas/schemas';
import {jobQuestionFormStyles} from '@/styles/jobs';

import JobsService from '@/services/jobs';
import ToastService from '@/services/toast';

const JobQuestionsForm = ({
  selectedJob,
  setIsQABottomSheetOpen,
  setIsBottomSheetVisible,
}: JobQuestionsFormInterface) => {
  const initialValues = {
    questionOne: '',
    questionTwo: '',
    questionThree: '',
  };

  const handleApplyForJob = (values: {
    questionOne: string;
    questionTwo: string;
    questionThree: string;
  }) => {
    const customQuestionsArray = [];
    customQuestionsArray.push({
      answer: values.questionOne,
      question: selectedJob?.customQuestions![0],
    });
    customQuestionsArray.push({
      answer: values.questionTwo,
      question: selectedJob?.customQuestions![1],
    });
    customQuestionsArray.push({
      answer: values.questionThree,
      question: selectedJob?.customQuestions![2],
    });
    JobsService.applyForJobWithCustomQuestions(
      selectedJob?.id!,
      customQuestionsArray,
    )
      .then(() => {
        ToastService.showSuccess('Applied to the Job Successfully');
        setIsQABottomSheetOpen(false);
        setIsBottomSheetVisible(false);
      })
      .catch(() => {
        ToastService.showError('An Error occured while applying to the job');
        setIsQABottomSheetOpen(false);
        setIsBottomSheetVisible(false);
      });
  };

  const {values, touched, handleChange, handleSubmit, errors} = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: jobCustomQuestionSchema,
    onSubmit: values => {
      handleApplyForJob(values);
    },
  });

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        <ScrollView>
          {selectedJob?.customQuestions?.length &&
            selectedJob?.customQuestions![0] && (
              <>
                <Text style={jobQuestionFormStyles.questionHeading}>
                  {selectedJob?.customQuestions[0]}
                </Text>
                <Input
                  placeholder="Answer"
                  value={values.questionOne}
                  onChangeText={handleChange('questionOne')}
                  keyboardType="default"
                  touched={touched.questionOne}
                  error={errors.questionOne}
                />
              </>
            )}
          {selectedJob?.customQuestions?.length &&
            selectedJob?.customQuestions![1] && (
              <>
                <Text style={jobQuestionFormStyles.questionHeading}>
                  {selectedJob?.customQuestions[1]}
                </Text>

                <Input
                  placeholder="Answer"
                  value={values.questionTwo}
                  touched={touched.questionTwo}
                  error={errors.questionTwo}
                  onChangeText={handleChange('questionTwo')}
                  keyboardType="default"
                />
              </>
            )}
          {selectedJob?.customQuestions?.length &&
            selectedJob?.customQuestions![2] && (
              <>
                <Text style={jobQuestionFormStyles.questionHeading}>
                  {selectedJob?.customQuestions[2]}
                </Text>

                <Input
                  placeholder="Answer"
                  value={values.questionThree}
                  onChangeText={handleChange('questionThree')}
                  keyboardType="default"
                  touched={touched.questionThree}
                  error={errors.questionThree}
                />
              </>
            )}
        </ScrollView>
      </View>
      <View style={commonStyles.footer}>
        <PrimaryButton title="Apply" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default JobQuestionsForm;
