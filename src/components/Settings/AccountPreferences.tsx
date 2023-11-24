import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SCREEN_NAMES} from '@/constants';
import {PrimaryButton} from '../Buttons';
import {getScreenDimensions} from '@/utils/functions';
import StorageService from '@/services/Storage';
import {useNavigation} from '@react-navigation/native';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RootState } from '@/store';
import { logOut } from '@/store/features/authSlice';
import { auth } from '@/config/firebase';

const {height} = getScreenDimensions();
const AccountPreferences = () => {
  const navigation = useNavigation();
  const {user} = useAppSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch();
  const [messagingEnabled, setMessagingEnabled] = useState(false);
  const [connectionsVisibleEnabled, setConnectionsVisibleEnabled] =
    useState(false);
  const toggleMessagingSwitch = () => {
    setMessagingEnabled(!messagingEnabled);
  };
  const toggleConnectionsVisibleSwitch = () => {
    setConnectionsVisibleEnabled(!connectionsVisibleEnabled);
  };

  const handleLogout = async () => {
    await StorageService.nuke();
    await dispatch(logOut());
    await auth.signOut();
    navigation.navigate(SCREEN_NAMES.Launch);
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
      <View style={styles.PPTOS}>
        <Text style={[styles.text, styles.underline]}>Privacy Policy</Text>
        <Text style={[styles.text, styles.PPtext, styles.underline]}>
          Terms of Use
        </Text>
      </View>
      <View style={styles.logOutButtonContainer}>
        <PrimaryButton title="Log out" onPress={handleLogout} />
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
    marginTop: 20,
  },
  PPTOS: {
    marginTop: height - 460,
    alignItems: 'center',
  },
  PPtext: {
    marginTop: 10,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
