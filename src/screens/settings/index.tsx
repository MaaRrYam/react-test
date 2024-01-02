import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  AccountPreferences,
  BasicInfo,
  BottomSheet,
  Feedback,
  PrimaryButton,
} from '@/components';
import {BackArrow} from '@/assets/icons';
import {COLORS, SETTINGS_TABS} from '@/constants';
import profileStyles from '@/styles/profile';
import {ScrollView} from 'react-native-gesture-handler';

interface SettingsProps {
  isVisible: boolean;
  onClose: () => void;
}

const Settings = ({isVisible, onClose}: SettingsProps) => {
  const [selectedButton, setSelectedButton] = useState(SETTINGS_TABS[0]);

  const handleButtonPress = (item: string) => {
    setSelectedButton(item);
  };

  const renderSettingsComponent = (title: string) => {
    switch (title) {
      case 'Basic Info':
        return <BasicInfo />;
      case 'Account Preferences':
        return <AccountPreferences />;
      case 'Feedback':
        return <Feedback />;
      default:
        return null;
    }
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      snapPoints={['10%', '100%']}
      indicatorVisible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <BackArrow />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <ScrollView
            horizontal
            contentContainerStyle={[
              profileStyles.tabButtonContainer,
              styles.buttonsContainer,
            ]}>
            {SETTINGS_TABS.map(item => (
              <PrimaryButton
                key={item}
                onPress={() => handleButtonPress(item)}
                backgroundColor={'#F4F4F4'}
                textColor={COLORS.black}
                style={
                  selectedButton === item
                    ? profileStyles.selectedPrimaryButtonStyles
                    : profileStyles.PrimaryButtonStyles
                }
                title={item}
              />
            ))}
          </ScrollView>

          {renderSettingsComponent(selectedButton)}
        </View>
      </View>
    </BottomSheet>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  backButton: {
    backgroundColor: COLORS.lightGrayBackground,
    width: 41,
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9998,
  },
  header: {
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 43,
    paddingBottom: 18,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  bgLight: {
    backgroundColor: COLORS.lightBackground,
  },
  bgLightBlue: {
    backgroundColor: COLORS.lightBlueBackground,
  },
  ml10: {
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: 20,
  },
});
