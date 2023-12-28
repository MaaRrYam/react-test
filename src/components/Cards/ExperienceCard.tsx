import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

import {COLORS} from '@/constants';
import {ExperienceCardProps} from 'interfaces';
import CardWrapper from './CardWrapper';
import {Cross} from '@/assets/icons';

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  id,
  currentCompany,
  designation,
  startingYear,
  endingYear,
  currentlyWorking,
  onPress,
  onRemove,
}) => {
  return (
    <CardWrapper
      key={id}
      onPress={() => {
        if (onPress) {
          onPress(id);
        }
      }}>
      <View style={styles.header}>
        <Text style={styles.company}>{currentCompany}</Text>
        <TouchableOpacity
          onPress={() => {
            if (onRemove) {
              onRemove(id);
            }
          }}>
          <Cross iconContainerStyles={styles.crossIcon} color="red" />
        </TouchableOpacity>
      </View>
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
  crossIcon: {
    alignItems: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default React.memo(ExperienceCard);
