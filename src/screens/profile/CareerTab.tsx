import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {CareerCard} from '@/components';
import {CareerTabProps} from '@/interfaces';

const CareerTab = ({careerList}: CareerTabProps) => {
  return (
    <ScrollView scrollEnabled>
      {careerList?.map((item, index) => (
        <View
          key={index}
          style={[
            styles.careerItem,
            {
              borderBottomColor:
                index === careerList.length - 1 ? 'transparent' : '#E4E4E4',
            },
          ]}>
          <CareerCard
            title={item.role}
            company={item.companyName}
            startDate={item.startYear}
            endDate={item.currentlyWorking ? 'Present' : item.endYear}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  careerItem: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
});

export default CareerTab;
