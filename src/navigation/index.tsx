import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StorageService from '@/services/Storage';
import navigationConfig from '@/navigation/NavigationConfig';
import {NavigationConfigProps} from '@/interfaces';
import {Loading} from '@/components';
import FirebaseService from '@/services/Firebase';
import {SCREEN_NAMES} from '@/constants'
const RootNavigation = () => {
  const MainStack = createStackNavigator();
  const [initialScreen, setInitialScreen] = useState();
  useEffect(() => {
    const fetchInitialScreen = async () => {
      try {
        const uid = await StorageService.getItem('uid');
        if (uid) {
          const userDoc = await FirebaseService.getDocument('users', uid);
          if (userDoc && !userDoc.onboarded) {
            setInitialScreen(SCREEN_NAMES.Onboarding);
          } else {
            setInitialScreen(SCREEN_NAMES.BottomNavigator);
          }
        } else {
          setInitialScreen(SCREEN_NAMES.Launch);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setInitialScreen(SCREEN_NAMES.Launch);
      }
    };

    fetchInitialScreen();
  }, []);

  if (!initialScreen) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{headerShown: false}}>
        {navigationConfig.map(({name, component}: NavigationConfigProps) => (
          <MainStack.Screen key={name} name={name} component={component} />
        ))}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
