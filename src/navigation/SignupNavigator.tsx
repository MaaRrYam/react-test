import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignupWithEmail} from '@/screens';
import {SCREEN_NAMES} from '@/constants';

const SignupStack = createStackNavigator();

const SignupNavigator = () => (
  <SignupStack.Navigator screenOptions={{headerShown: false}}>
    <SignupStack.Screen
      name={SCREEN_NAMES.SignupWithEmail}
      component={SignupWithEmail}
    />
  </SignupStack.Navigator>
);

export default SignupNavigator;
