// SignupNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignupScreen, SignupWithEmail} from '@/screens';

const SignupStack = createStackNavigator();

const SignupNavigator = () => (
  <SignupStack.Navigator screenOptions={{headerShown: false}}>
    <SignupStack.Screen name="SignupOptions" component={SignupScreen} />
    <SignupStack.Screen name="SignupWithEmail" component={SignupWithEmail} />
  </SignupStack.Navigator>
);

export default SignupNavigator;
