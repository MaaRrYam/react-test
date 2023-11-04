import {StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {BottomSheet} from '@/components';

interface SettingsProps {
  isVisible: boolean;
  onClose: () => void;
}
const Settings = ({isVisible, onClose}: SettingsProps) => {
  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      snapPoints={['10%', '100%']}
      indicatorVisible={false}>
      <View>
        <Text style={{color: 'black'}}>HELOO</Text>
      </View>
    </BottomSheet>
  );
};

export default Settings;

const styles = StyleSheet.create({});
