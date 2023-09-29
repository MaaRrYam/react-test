import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {BackButton, PrimaryButton} from '@/components';
import {commonStyles} from '@/styles/onboarding';
import {COLORS, MARGINS, SCREEN_NAMES} from '@/constants';
import {ExperienceScreenProps} from '@/types';
import {RoleService} from '@/services/onboarding';
import {ActivityIndicator} from 'react-native';

const Industry: React.FC<ExperienceScreenProps> = ({navigation}) => {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [allIndustries, setAllIndustries] = useState<string[]>([]);

  const toggleIndustrySelection = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(
        selectedIndustries.filter(item => item !== industry),
      );
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  useEffect(() => {
    RoleService.getJobRoles().then(setAllIndustries);
  }, []);

  const handleSubmit = () => {
    navigation.navigate(SCREEN_NAMES.Experience);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.container}>
        <BackButton onPress={() => console.log('Back button pressed')} />
        <Text style={commonStyles.title}>Your Function</Text>

        {allIndustries.length ? (
          <ScrollView
            style={styles.industryScrollView}
            contentContainerStyle={styles.industryList}>
            {allIndustries.map(industry => (
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
                      : COLORS.border,
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
        ) : (
          <SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </SafeAreaView>
        )}
      </View>
      <View style={commonStyles.footer}>
        <PrimaryButton
          title="Continue"
          onPress={handleSubmit}
          disabled={!selectedIndustries.length}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  industryScrollView: {
    marginBottom: MARGINS.general,
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
