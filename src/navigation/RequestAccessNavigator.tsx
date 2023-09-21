import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SelectRole, RequestAccessComplete, RequestAccess} from '@/screens';
import {SCREEN_NAMES} from '@/constants';
const RequestAccessStack = createStackNavigator();

const RequestAccessNavigator = () => (
  <RequestAccessStack.Navigator screenOptions={{headerShown: false}}>
    <RequestAccessStack.Screen
      name={SCREEN_NAMES.SelectRole}
      component={SelectRole}
    />
    <RequestAccessStack.Screen
      name={SCREEN_NAMES.RequestAccessForm}
      component={RequestAccess}
    />
    <RequestAccessStack.Screen
      name={SCREEN_NAMES.RequestAccessComplete}
      component={RequestAccessComplete}
    />
  </RequestAccessStack.Navigator>
);

export default RequestAccessNavigator;
