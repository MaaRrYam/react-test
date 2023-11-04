import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Feedback = () => {
  return (
    <View>
      <Text style={styles.text}>Feedback</Text>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
    text:{
        color: 'black'
    }
});
