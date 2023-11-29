import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {JobsCardProps} from '@/interfaces';
import {jobCardStyles} from '@/styles/jobs/index';

const JobsCard: React.FC<JobsCardProps> = ({
  jobTitle = 'Job Title',
  companyName = 'Company Name',
  companyLogo = '',
  jobLocation = 'Job Location',
  companyLocation = 'Company Location',
  onPress,
}) => {
  return (
    <TouchableOpacity style={jobCardStyles.container} onPress={onPress}>
      <View style={jobCardStyles.iconContainer}>
        {companyLogo ? (
          <FastImage
            resizeMode="cover"
            source={{
              uri: companyLogo,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            style={jobCardStyles.icon}
          />
        ) : (
          <FastImage
            resizeMode="cover"
            source={require('@/assets/images/emblem.png')}
            style={jobCardStyles.icon}
          />
        )}
      </View>
      <View style={jobCardStyles.textContainer}>
        <Text style={jobCardStyles.title}>{jobTitle}</Text>
        <Text style={jobCardStyles.company}>{companyName}</Text>
        <View style={jobCardStyles.dateContainer}>
          <Text style={jobCardStyles.date}>
            {jobLocation} - {companyLocation}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobsCard;
