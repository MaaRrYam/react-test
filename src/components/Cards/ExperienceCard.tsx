import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {COLORS} from '../../constants';
import {ExperienceCardProps} from 'interfaces';
import CardWrapper from './CardWrapper';

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  id,
  currentCompany,
  designation,
  startingYear,
  endingYear,
  currentlyWorking,
  onPress,
}) => {
  return (
    <CardWrapper
      key={id}
      onPress={() => {
        if (onPress) {
          onPress(id);
        }
      }}>
      <Text style={styles.company}>{currentCompany}</Text>
      <Text style={styles.designation}>{designation}</Text>
      <Text style={styles.duration}>
        {startingYear} - {currentlyWorking ? 'Present' : endingYear}
      </Text>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  company: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  designation: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 5,
  },
  duration: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 5,
    textAlign: 'right',
  },
});

export default ExperienceCard;
