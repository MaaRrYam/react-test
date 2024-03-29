import {Dimensions, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS, FONTS} from '@/constants';
import {PrimaryButton} from '../Buttons';
import StorageService from '@/services/Storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {logOut, updateUserData} from '@/store/features/authSlice';
import {auth} from '@/config/firebase';
import {RootStackParamList} from '@/types';
import ProfileService from '@/services/profile';
import {useAppSelector} from '@/hooks/useAppSelector';

const AccountPreferences = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {user} = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();
  const [messagingEnabled, setMessagingEnabled] = useState(
    user.allowEveryoneToSendMessage || false,
  );
  const [connectionsVisibleEnabled, setConnectionsVisibleEnabled] = useState(
    user.allowEveryoneToSeeMyConnections || false,
  );

  const toggleMessagingSwitch = () => {
    const updatedValue = !messagingEnabled;
    setMessagingEnabled(updatedValue);
    handleSendMessage(updatedValue);
  };

  const toggleConnectionsVisibleSwitch = () => {
    const updatedValue = !connectionsVisibleEnabled;
    setConnectionsVisibleEnabled(updatedValue);
    handleConnectionVisibility(updatedValue);
  };

  const handleLogout = async () => {
    await StorageService.nuke();
    dispatch(logOut());
    await auth.signOut();
    navigation.navigate('Launch');
  };

  const handleSendMessage = useCallback(
    async (newValue: boolean) => {
      await ProfileService.allowEveryoneToSendMessage(newValue);
      dispatch(updateUserData({...user, allowEveryoneToSendMessage: newValue}));
    },
    [dispatch, user],
  );

  const handleConnectionVisibility = useCallback(
    async (newValue: boolean) => {
      await ProfileService.allowEveryoneToSeeMyConnections(newValue);
      dispatch(
        updateUserData({...user, allowEveryoneToSeeMyConnections: newValue}),
      );
    },
    [dispatch, user],
  );

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>Allow everyone to send me message</Text>
          <Switch
            trackColor={{false: COLORS.lightBackground, true: COLORS.primary}}
            thumbColor={COLORS.white}
            ios_backgroundColor={COLORS.lightBackground}
            onValueChange={toggleMessagingSwitch}
            value={messagingEnabled}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>Allow everyone to see my connections</Text>
          <Switch
            trackColor={{false: COLORS.lightBackground, true: COLORS.primary}}
            thumbColor={COLORS.white}
            ios_backgroundColor={COLORS.lightBackground}
            onValueChange={toggleConnectionsVisibleSwitch}
            value={connectionsVisibleEnabled}
          />
        </View>
      </View>
      <View style={styles.logOutButtonContainer}>
        <View style={styles.PPTOS}>
          <Text style={[styles.text, styles.underline]}>Privacy Policy</Text>
          <Text style={[styles.text, styles.PPtext, styles.underline]}>
            Terms of Use
          </Text>
        </View>
        <PrimaryButton title="Log out" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default AccountPreferences;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: Dimensions.get('window').height * 0.66,
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.black,
    fontSize: FONTS.bodyRegular,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logOutButtonContainer: {},
  PPTOS: {
    marginBottom: 10,
    alignItems: 'center',
  },
  PPtext: {
    marginTop: 10,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
