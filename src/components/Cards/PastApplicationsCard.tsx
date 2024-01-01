import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

import {PastApplicationCardInterface} from '@/interfaces';
import {pastApplicationCardStyles} from '@/styles/jobs/index';
import {COLORS, FONTS} from '@/constants';

const PastApplicationsCard: React.FC<PastApplicationCardInterface> = ({
  jobTitle = 'Job Title',
  companyLogo = '',
  isAccepted = false,
  isPending = false,
  starred = false,
  feedback = '',
  rating = 0,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={pastApplicationCardStyles.container}
      onPress={onPress}>
      <View style={pastApplicationCardStyles.iconContainer}>
        {companyLogo ? (
          <FastImage
            resizeMode="cover"
            source={{
              uri: companyLogo,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            style={pastApplicationCardStyles.icon}
          />
        ) : (
          <Image
            resizeMode="cover"
            source={require('@/assets/images/emblem.png')}
            style={pastApplicationCardStyles.icon}
          />
        )}
      </View>
      <View style={pastApplicationCardStyles.textContainer}>
        <Text style={pastApplicationCardStyles.textStyles}>{jobTitle}</Text>
        <View style={pastApplicationCardStyles.pastDetails}>
          <Text style={pastApplicationCardStyles.textStyles}>Status:</Text>

          {isAccepted && !isPending && !starred ? (
            <Text style={{fontSize: FONTS.text, color: COLORS.text}}>
              Application accepted
            </Text>
          ) : isPending && !isAccepted && !starred ? (
            <Text style={{fontSize: FONTS.text, color: COLORS.text}}>
              Review Pending
            </Text>
          ) : (
            starred &&
            !isAccepted &&
            !isPending && (
              <Text style={{fontSize: FONTS.text, color: COLORS.text}}>
                Under Review
              </Text>
            )
          )}
        </View>
        {feedback && (
          <View style={pastApplicationCardStyles.pastDetails}>
            <Text style={pastApplicationCardStyles.textStyles}>Feedback</Text>
            {feedback}
          </View>
        )}
        <View style={pastApplicationCardStyles.pastDetails}>
          <Text style={pastApplicationCardStyles.textStyles}>Rating </Text>
          <Text style={{fontSize: FONTS.text}}>{rating} / 10</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(PastApplicationsCard);
