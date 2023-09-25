import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  GetStarted,
  Education,
  Industry,
  Experience,
  EmploymentStatus,
  SalaryExpectations,
  OnboardingCompleted,
} from '@/screens';
import {SCREEN_NAMES} from '@/constants';

const OnboardingStack = createStackNavigator();
const OnboardingNavigator = () => (
  <OnboardingStack.Navigator screenOptions={{headerShown: false}}>
    <OnboardingStack.Screen
      name={SCREEN_NAMES.GetStarted}
      component={GetStarted}
    />
    <OnboardingStack.Screen
      name={SCREEN_NAMES.Education}
      component={Education}
    />
    <OnboardingStack.Screen name={SCREEN_NAMES.Industry} component={Industry} />
    <OnboardingStack.Screen
      name={SCREEN_NAMES.Experience}
      component={Experience}
    />
    <OnboardingStack.Screen
      name={SCREEN_NAMES.EmploymentStatus}
      component={EmploymentStatus}
    />
    <OnboardingStack.Screen
      name={SCREEN_NAMES.SalaryExpectations}
      component={SalaryExpectations}
    />
    <OnboardingStack.Screen
      name={SCREEN_NAMES.OnboardingCompleted}
      component={OnboardingCompleted}
    />
  </OnboardingStack.Navigator>
);

export default OnboardingNavigator;
