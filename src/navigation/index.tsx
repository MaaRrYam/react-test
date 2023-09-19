import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StorageService from '../services/Storage';
import navigationConfig from './NavigationConfig';
import {NavigationConfigProps} from '@/interfaces';;
import {Loading} from '@/components';
import FirebaseService from '@/services/Firebase';
const RootNavigation = () => {
  const MainStack = createStackNavigator();
  const [initialScreen, setInitialScreen] = useState('');

  useEffect(() => {
    const fetchInitialScreen = async () => {
      try {
        const uid = await StorageService.getItem('uid');
        if (uid !== undefined) {
          // If uid is in storage, check the user's onboarded status
          const userDoc = await FirebaseService.getDocument('users', uid);
          if (userDoc && userDoc.onboarded === false) {
            setInitialScreen('Onboarding');
          } else {
            setInitialScreen('MyTabs');
          }
        } else {
          setInitialScreen('Main');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setInitialScreen('Main');
      }
    };

    fetchInitialScreen();
  }, []);

  if (initialScreen === '') {
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
