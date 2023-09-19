// RequestAccessNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SelectRole, RequestAccessComplete, RequestAccess} from '@/screens';

const RequestAccessStack = createStackNavigator();

const RequestAccessNavigator = () => (
  <RequestAccessStack.Navigator screenOptions={{headerShown: false}}>
    <RequestAccessStack.Screen name="SelectRole" component={SelectRole} />
    <RequestAccessStack.Screen
      name="RequestAccessComplete"
      component={RequestAccessComplete}
    />
    <RequestAccessStack.Screen name="RequestAccess" component={RequestAccess} />
  </RequestAccessStack.Navigator>
);

export default RequestAccessNavigator;
