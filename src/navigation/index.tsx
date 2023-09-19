import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StorageService from '../services/Storage';
import {useNavigation} from '@react-navigation/native';
import navigationConfig from './NavigationConfig';
import {NavigationConfigProps} from '@/interfaces';
import {Text} from 'react-native';
import {LoadingScreen} from '@/screens';
const RootNavigation = () => {
  const MainStack = createStackNavigator();
  const [initialScreen, setInitialScreen] = useState('');

  useEffect(() => {
    const fetchInitialScreen = async () => {
      try {
        // Fetch the 'uid' from AsyncStorage
        const item = await StorageService.getItem('uid');
        console.log(item);
        // Determine the initial screen based on the presence of 'uid'
        const screen = item !== undefined ? 'MyTabs' : 'Main';
        setInitialScreen(screen);
      } catch (error) {
        // Handle errors here if needed
        console.error('Error fetching data:', error);
        setInitialScreen('Main'); // Default to 'Main' screen on error
      }
    };

    fetchInitialScreen();
  }, []);

  // Conditional rendering based on initialScreen
  if (initialScreen === '') {
    // Display a loading indicator or splash screen while initializing
    return <LoadingScreen />;
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
