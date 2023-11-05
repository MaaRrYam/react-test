import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  AccountPreferences,
  BasicInfo,
  BottomSheet,
  Feedback,
  RoundedButton,
} from '@/components';
import {BackArrow} from '@/assets/icons';
import {COLORS, SETTINGS_TABS} from '@/constants';
interface SettingsProps {
  isVisible: boolean;
  onClose: () => void;
}

const Settings = ({isVisible, onClose}: SettingsProps) => {
  const [selectedButton, setSelectedButton] = useState(SETTINGS_TABS[0]);

  const handleButtonPress = (item: string) => {
    setSelectedButton(item === selectedButton ? '' : item);
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
      indicatorVisible={false}
      containerStyle={{}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <BackArrow />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal contentContainerStyle={styles.buttonsContainer}>
          {SETTINGS_TABS.map((item, index) => (
            <View>
              <RoundedButton
                key={index}
                onPress={() => handleButtonPress(item)}
                style={[
                  styles.roundedButton,
                  selectedButton === item && styles.bgLightBlue,
                  item !== SETTINGS_TABS[0] && styles.ml10,
                ]}
                text={item}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.componentContainer}>
          {selectedButton && renderSettingsComponent(selectedButton)}
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
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  roundedButton: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
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
  componentContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
});
