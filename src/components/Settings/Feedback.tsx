import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown, TextArea} from '../Inputs';
import {COLORS, feedbackCategories} from '@/constants';
import {CameraIcon} from '@/assets/icons';
import {PrimaryButton} from '../Buttons';
import {Asset, ImageInterface} from '@/interfaces';
const Feedback = () => {
  const [issueType, setIssueType] = useState('Select a type of Issue');
  const [feedback, setFeedback] = useState('');
  const [selectedImage, setSelectedImage] = useState<
    ImageInterface | Asset | null
  >(null);
  useEffect(() => {
    console.log(issueType);
  }, [issueType]);
  return (
    <View>
      <View>
        <Dropdown
          options={feedbackCategories}
          onOptionSelect={option => setIssueType(option)}
          selectedOption={issueType ? issueType : 'Select type of issue'}
        />
      </View>
      <View style={styles.feedbackTextContainer}>
        <TextArea
          onChangeText={setFeedback}
          placeholder="Write Feedback"
          value={feedback}
        />
      </View>
      <View>
        <Text style={styles.text}>Attach Screenshot (optional)</Text>
      </View>
      <View style={styles.cameraIconContainer}>
        <CameraIcon />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Submit" onPress={() => {}} />
      </View>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  cameraIconContainer: {
    backgroundColor: COLORS.lightBlueBackground,
    width: 94,
    height: 94,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  feedbackTextContainer: {
    marginTop: 45,
  },
  buttonContainer: {
    marginTop: 120,
  },
});
