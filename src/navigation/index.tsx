import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StorageService from '../services/Storage';
// import {useNavigation} from '@react-navigation/native';
import navigationConfig from './NavigationConfig';
import {NavigationConfigProps} from '@/interfaces';
// import {Text} from 'react-native';
import {Loading} from '@/components';
const RootNavigation = () => {
  const MainStack = createStackNavigator();
  const [initialScreen, setInitialScreen] = useState('');

  useEffect(() => {
    const fetchInitialScreen = async () => {
      try {
        const item = await StorageService.getItem('uid');
        const screen = item !== undefined ? 'MyTabs' : 'Main';
        setInitialScreen(screen);
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
