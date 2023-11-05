import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '@/constants';
import {PrimaryButton} from '../Buttons';
import {getScreenDimensions} from '@/utils/functions';

const {height} = getScreenDimensions();
const AccountPreferences = () => {
  const [messagingEnabled, setMessagingEnabled] = useState(false);
  const [connectionsVisibleEnabled, setConnectionsVisibleEnabled] =
    useState(false);
  const toggleMessagingSwitch = () => {
    setMessagingEnabled(!messagingEnabled);
  };
  const toggleConnectionsVisibleSwitch = () => {
    setConnectionsVisibleEnabled(!connectionsVisibleEnabled);
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Allow everyone to send me message</Text>
        <Switch
          trackColor={{false: COLORS.lightBackground, true: COLORS.primary}}
          thumbColor={COLORS.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleMessagingSwitch}
          value={messagingEnabled}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Allow everyone to see my connections</Text>
        <Switch
          trackColor={{false: COLORS.lightBackground, true: COLORS.primary}}
          thumbColor={COLORS.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleConnectionsVisibleSwitch}
          value={connectionsVisibleEnabled}
        />
      </View>
      <View style={styles.logOutButtonContainer}>
        <PrimaryButton title="Log out" onPress={() => {}} />
      </View>
    </View>
  );
};

export default AccountPreferences;

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logOutButtonContainer: {
    marginTop: height - 400,
  },
});
