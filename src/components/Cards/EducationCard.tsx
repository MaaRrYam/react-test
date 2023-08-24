import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {COLORS} from '../../constants';
import {EducationCardProps} from 'interfaces';
import CardWrapper from './CardWrapper';

const EducationCard = ({
  id,
  instituteName,
  degree,
  cgpa,
  startingYear,
  endingYear,
  currentlyWorking,
  onPress,
}: EducationCardProps) => {
  return (
    <CardWrapper onPress={() => onPress(id)}>
      <Text style={styles.instituteName}>{instituteName}</Text>
      <Text style={styles.degree}>{degree}</Text>
      <View style={styles.thirdLine}>
        <Text style={styles.cgpa}>{cgpa || ' '}</Text>
        <Text style={styles.dateRange}>
          {`${startingYear} - ${currentlyWorking ? 'Present' : endingYear}`}
        </Text>
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  instituteName: {
    fontSize: 16,
  },
  degree: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 5,
  },
  thirdLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  cgpa: {
    fontSize: 16,
  },
  dateRange: {
    fontSize: 16,
  },
});

export default EducationCard;
