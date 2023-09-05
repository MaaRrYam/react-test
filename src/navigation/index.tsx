import React from 'react';
import {useAuth} from '../hooks/useAuth';
import AuthStack from './AuthStack';
import AppStack from './AppNavigation';

const RootNavigation = () => {
  const {user} = useAuth();

  return user ? <AppStack /> : <AuthStack />;
};

export default RootNavigation;
