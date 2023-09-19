// OnboardingNavigator.tsx
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

const OnboardingStack = createStackNavigator();

const OnboardingNavigator = () => (
  <OnboardingStack.Navigator screenOptions={{headerShown: false}}>
    <OnboardingStack.Screen name="GetStarted" component={GetStarted} />
    <OnboardingStack.Screen name="Education" component={Education} />
    <OnboardingStack.Screen name="Industry" component={Industry} />
    <OnboardingStack.Screen name="Experience" component={Experience} />
    <OnboardingStack.Screen
      name="EmploymentStatus"
      component={EmploymentStatus}
    />
    <OnboardingStack.Screen
      name="SalaryExpectations"
      component={SalaryExpectations}
    />
    <OnboardingStack.Screen
      name="OnboardingCompleted"
      component={OnboardingCompleted}
    />
  </OnboardingStack.Navigator>
);

export default OnboardingNavigator;
