import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from 'react';

import navigationConfig from './NavigationConfig';
import {NavigationConfigProps} from '@/interfaces';
const RootNavigation = () => {
  const MainStack = createStackNavigator();

  useEffect(() => {
    // Add any user-related logic here if needed
  }, []);

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={'Main'}
        screenOptions={{headerShown: false}}>
        {navigationConfig.map(({name, component}: NavigationConfigProps) => (
          <MainStack.Screen key={name} name={name} component={component} />
        ))}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
