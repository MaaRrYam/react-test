import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown, TextArea} from '../Inputs';
import {COLORS} from '@/constants';
import {Chats} from '@/assets/icons';
import {PrimaryButton} from '../Buttons';
const Feedback = () => {
  const [issueType, setIssueType] = useState('Select a type of Issue');
  const [feedback, setFeedback] = useState('');
  useEffect(() => {
    console.log(issueType);
  }, [issueType]);
  return (
    <View>
      <View>
        <Dropdown
          options={['Hello', '1', '2']}
          onOptionSelect={option => setIssueType(option)}
          selectedOption={issueType ? issueType : 'Select type of issue'}
        />
      </View>
      <View style={{marginTop: 45}}>
        <TextArea
          onChangeText={setFeedback}
          placeholder="Write Feedback"
          value={feedback}
        />
      </View>
      <View>
        <Text style={styles.text}>Attach Screenshot (optional)</Text>
      </View>
      <View
        style={{
          backgroundColor: COLORS.lightBlueBackground,
          width: 94,
          height: 94,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Chats />
      </View>
      <View style={{marginTop: 120}}>
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
});
