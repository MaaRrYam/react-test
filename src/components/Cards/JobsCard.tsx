import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BORDER_RADIUS, COLORS} from '../../constants';

interface JobsCardProps {
  jobTitle?: string;
  companyName?: string;
  companyLogo?: string;
  jobLocation?: string;
  companyLocation?: string;
  onPress?: () => void;
}

const JobsCard: React.FC<JobsCardProps> = ({
  jobTitle = 'Job Title',
  companyName = 'Company Name',
  companyLogo = '',
  jobLocation = 'Job Location',
  companyLocation = 'Company Location',
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        {companyLogo !== '' ? (
          <Image source={{uri: companyLogo}} style={styles.icon} />
        ) : (
          <Image
            source={require('@/assets/images/emblem.png')}
            style={styles.icon}
          />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{jobTitle}</Text>
        <Text style={styles.company}>{companyName}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {jobLocation} - {companyLocation}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 18,
    paddingVertical: 17,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    marginLeft: 15,
    justifyContent: 'center',
    backgroundColor: COLORS.lightGrayBackground,
    borderRadius: BORDER_RADIUS.general,
  },
  icon: {
    width: 35,
    height: 35,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
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

export default JobsCard;
