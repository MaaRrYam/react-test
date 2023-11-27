import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {BORDER_RADIUS, COLORS, PADDING} from '@/constants';
import {Delete, NewChatIcon as NewChat} from '@/assets/icons';
import {CareerCardProps} from '@/interfaces';

const CareerCard: React.FC<CareerCardProps> = ({
  company = 'Company',
  endDate = 'End Date',
  startDate = 'Start Date',
  title = 'Title',
  editable = false,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FastImage
          resizeMode="cover"
          source={{
            uri: require('@/assets/images/emblem.png'),
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.icon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.company}>{company}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {startDate} - {endDate}
          </Text>
        </View>
      </View>
      {editable && (
        <View style={styles.editableContainer}>
          <TouchableOpacity onPress={onDelete}>
            <View style={styles.deleteButton}>
              <Delete />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onEdit}>
            <View style={styles.newChatButton}>
              <NewChat />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: PADDING.general,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
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
    marginLeft: 10,
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
  editableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginRight: 10,
    backgroundColor: COLORS.deleteButtonBackground,
    padding: 10,
    borderRadius: 26,
  },
  newChatButton: {
    backgroundColor: COLORS.lightGrayBackground,
    padding: 10,
    borderRadius: 1000,
  },
});

export default CareerCard;
