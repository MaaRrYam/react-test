import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import useAuth from '@/hooks/useAuth';
import AuthStack from '@navigation/AuthStack';
import AppStack from '@/navigation/OnboardingStack';
import HomeStack from '@/navigation/HomeStack';

const RootNavigation = () => {
  const {user} = useAuth();

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
