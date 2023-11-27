import React from 'react';
import {ScrollView, View} from 'react-native';
import {CareerCard} from '@/components';
import {EducationTabProps} from '@/interfaces';
import {editTabStyles as styles} from './styles';
const EducationTab = ({educationList}: EducationTabProps) => {
  return (
    <ScrollView>
      {educationList.map((item, index) => (
        <View
          key={index}
          style={[
            styles.tabItem,
            index === educationList.length - 1
              ? styles.borderBottomTransparent
              : styles.borderBottomColored,
          ]}>
          <CareerCard
            title={item.degree}
            company={item.instituteName}
            startDate={item.startYear}
            endDate={item.currentlyStudying ? 'Present' : item.endYear}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default EducationTab;
