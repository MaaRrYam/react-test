import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

import {Cross} from '@/assets/icons';
import {COLORS, FONTS} from '@/constants';
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
  onRemove,
}: EducationCardProps) => {
  return (
    <CardWrapper onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.instituteName}>{instituteName}</Text>
        <TouchableOpacity
          onPress={() => {
            if (onRemove) {
              onRemove(id);
            }
          }}>
          <Cross iconContainerStyles={styles.crossIcon} color="red" />
        </TouchableOpacity>
      </View>
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
  crossIcon: {
    alignItems: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default React.memo(EducationCard);
