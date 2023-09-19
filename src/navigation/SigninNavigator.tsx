import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SigninScreen, SigninWithEmail} from '@/screens';

const SigninStack = createStackNavigator();

const SigninNavigator = () => (
  <SigninStack.Navigator screenOptions={{headerShown: false}}>
    <SigninStack.Screen name="SigninOptionsScreen" component={SigninScreen} />
    <SigninStack.Screen name="SigninWithEmail" component={SigninWithEmail} />
  </SigninStack.Navigator>
);

export default SigninNavigator;
