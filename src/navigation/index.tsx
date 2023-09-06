import React from 'react';
import useAuth from '@/hooks/useAuth';
import AuthStack from '@navigation/AuthStack';
import AppStack from '@/navigation/AppNavigation';

const RootNavigation = () => {
  const {user} = useAuth();

  return user ? <AppStack /> : <AuthStack />;
};

export default RootNavigation;
