import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {COLORS, FONTS} from '../../constants';
import {EducationCardProps} from 'interfaces';
import CardWrapper from './CardWrapper';

const EducationCard = ({
  id,
  instituteName,
  degree,
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
        <Text style={styles.dateRange}>
          {`${startingYear} - ${currentlyWorking ? 'Present' : endingYear}`}
        </Text>
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  instituteName: {
    fontSize: FONTS.bodyRegular,
    color: COLORS.black,
  },
  degree: {
    fontSize: FONTS.bodySmall,
    color: COLORS.text,
    marginTop: 5,
  },
  thirdLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  cgpa: {
    fontSize: FONTS.bodySmall,
    color: COLORS.text,
  },
  dateRange: {
    fontSize: FONTS.bodySmall,
    color: COLORS.text,
  },
});

export default EducationCard;
