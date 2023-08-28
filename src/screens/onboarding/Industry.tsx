import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {BackButton, Button} from 'components';
import {commonStyles} from 'styles/onboarding';
import {COLORS, industries} from '../../constants';
import {ExperienceScreenProps} from 'types';

const Industry: React.FC<ExperienceScreenProps> = ({navigation}) => {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const toggleIndustrySelection = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(
        selectedIndustries.filter(item => item !== industry),
      );
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        <BackButton onPress={() => console.log('Back button pressed')} />
        <Text style={commonStyles.title}>Your Function</Text>

        <ScrollView
          style={styles.industryScrollView}
          contentContainerStyle={styles.industryList}>
          {industries.map(industry => (
            <TouchableOpacity
              key={industry}
              style={[
                styles.industryItem,
                {
                  backgroundColor: selectedIndustries.includes(industry)
                    ? COLORS.primary
                    : COLORS.white,
                  borderColor: selectedIndustries.includes(industry)
                    ? COLORS.primary
                    : COLORS.borderGray,
                },
              ]}
              onPress={() => toggleIndustrySelection(industry)}>
              <Text
                style={{
                  color: selectedIndustries.includes(industry)
                    ? COLORS.white
                    : COLORS.black,
                }}>
                {industry}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={commonStyles.footer}>
          <Button
            title="Continue"
            onPress={() => navigation.navigate('Experience')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  industryScrollView: {
    marginBottom: 20,
  },
  industryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  industryItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
});

export default Industry;
