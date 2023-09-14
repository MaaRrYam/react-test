import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';

import {SignIn, RequestAccess} from '@/screens';
import {COLORS} from '@/constants';
import {SelectRole, RequestAccessComplete} from '@/screens';
import {
  Education,
  EmploymentStatus,
  Experience,
  GetStarted,
  Home,
  Industry,
  OnboardingCompleted,
  SalaryExpectations,
} from '../screens';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Education" component={Education} />
          <Stack.Screen name="Industry" component={Industry} />
          <Stack.Screen name="Experience" component={Experience} />
          <Stack.Screen name="EmploymentStatus" component={EmploymentStatus} />
          <Stack.Screen
            name="SalaryExpectations"
            component={SalaryExpectations}
          />
          <Stack.Screen
            name="OnboardingCompleted"
            component={OnboardingCompleted}
          />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="RequestAccess" component={RequestAccess} />
          <Stack.Screen name="SelectRole" component={SelectRole} />
          <Stack.Screen
            name="RequestAccessComplete"
            component={RequestAccessComplete}
          />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default AppNavigation;
