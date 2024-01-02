import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Input, PrimaryButton} from '@/components';
import Layout from './Layout';
import {commonStyles} from '@/styles/onboarding';
import {COLORS, MARGINS} from '@/constants';
import {ExperienceScreenProps} from '@/types';
import {RoleService} from '@/services/requestAccess';
import {ActivityIndicator} from 'react-native';
import useUserManagement from '@/hooks/useUserManagement';
import OnboardingService from '@/services/onboarding';

const Industry: React.FC<ExperienceScreenProps> = ({navigation}) => {
  const {user} = useUserManagement();

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    user?.jobTags || [],
  );
  const [allIndustries, setAllIndustries] = useState<string[]>([]);
  const [filteredIndustries, setFilteredIndustries] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');

  const toggleIndustrySelection = useCallback(
    (industry: string) => {
      if (selectedIndustries.includes(industry)) {
        setSelectedIndustries(
          selectedIndustries.filter(item => item !== industry),
        );
      } else {
        setSelectedIndustries([...selectedIndustries, industry]);
      }
    },
    [selectedIndustries],
  );

  const handleSubmit = useCallback(async () => {
    OnboardingService.industry(selectedIndustries);
    navigation.navigate('Experience');
  }, [navigation, selectedIndustries]);

  useEffect(() => {
    RoleService.getJobRoles().then(setAllIndustries);
  }, []);

  useEffect(() => {
    setFilteredIndustries(
      allIndustries.filter(industry =>
        industry.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [allIndustries, search]);

  return (
    <Layout
      title="Your Role"
      footer={
        <PrimaryButton
          title="Continue"
          onPress={handleSubmit}
          disabled={!selectedIndustries.length}
        />
      }>
      {filteredIndustries.length ? (
        <>
          <Input
            placeholder="Search for your role"
            value={search}
            onChangeText={setSearch}
            style={commonStyles.yourFunctionSearchInput}
          />
          <ScrollView
            style={styles.industryScrollView}
            contentContainerStyle={styles.industryList}>
            {filteredIndustries.map(industry => (
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
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </Layout>
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
