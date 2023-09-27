import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '@/constants';

interface CareerCardProps {
  title?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
}

const CareerCard: React.FC<CareerCardProps> = ({
  company,
  endDate,
  startDate,
  title,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('@/assets/images/emblem.png')}
          style={styles.icon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title ? title : 'Title'}</Text>
        <Text style={styles.company}>{company ? company : 'Company'}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {startDate ? startDate : 'Start Date'}
          </Text>
          <Text style={styles.date}> - </Text>
          <Text style={styles.date}>{endDate ? endDate : 'End Date'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    columnGap: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGrayBackground,
    borderRadius: 10,
  },
  icon: {
    width: 35,
    height: 35,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  company: {
    color: COLORS.text,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  date: {
    color: COLORS.text,
  },
});

export default CareerCard;
