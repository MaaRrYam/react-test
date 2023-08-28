import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SignIn,
  SelectRole,
  RequestAccess,
  RequestAccessComplete,
  GetStarted,
  Education,
  Industry,
  Experience,
  EmploymentStatus,
  SalaryExpectations,
  OnboardingCompleted,
} from 'screens';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SelectRole" component={SelectRole} />
        <Stack.Screen name="RequestAccess" component={RequestAccess} />
        <Stack.Screen
          name="RequestAccessComplete"
          component={RequestAccessComplete}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
