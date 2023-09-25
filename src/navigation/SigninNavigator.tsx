import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SigninScreen, SigninWithEmail} from '@/screens';
import {SCREEN_NAMES} from '@/constants';

const SigninStack = createStackNavigator();
const SigninNavigator = () => (
  <SigninStack.Navigator screenOptions={{headerShown: false}}>
    <SigninStack.Screen
      name={SCREEN_NAMES.SigninOptions}
      component={SigninScreen}
    />
    <SigninStack.Screen
      name={SCREEN_NAMES.SigninWithEmail}
      component={SigninWithEmail}
    />
  </SigninStack.Navigator>
);

export default SigninNavigator;
