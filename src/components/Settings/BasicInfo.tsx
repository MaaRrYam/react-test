import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BasicInfo = () => {
  return (
    <View>
      <Text style={styles.text}>BasicInfo</Text>
    </View>
  );
};

export default BasicInfo;

const styles = StyleSheet.create({
    text: {
        color: 'black'
    }
});
