import React from 'react';
import {ScrollView, View} from 'react-native';
import {CareerCard} from '@/components';
import {CareerTabProps} from '@/interfaces';
import {editTabStyles as styles} from './styles';
const CareerTab = ({careerList}: CareerTabProps) => {
  return (
    <ScrollView scrollEnabled>
      {careerList?.map((item, index) => (
        <View
          key={index}
          style={[
            styles.tabItem,
            index === careerList.length - 1
              ? styles.borderBottomTransparent
              : styles.borderBottomColored,
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

export default CareerTab;
