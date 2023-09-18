import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import useAuth from '@/hooks/useAuth';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ChatDetails,
  Chats,
  Education,
  EmploymentStatus,
  Experience,
  GetStarted,
  Industry,
  OnboardingCompleted,
  RequestAccess,
  RequestAccessComplete,
  SalaryExpectations,
  SelectRole,
  SignIn,
} from '@/screens';
import MyTabs from '@/components/Drawer';
import {useEffect} from 'react';
const RequestAccessStack = createStackNavigator();
const RequestAccessNavigator = () => (
  <RequestAccessStack.Navigator>
    <RequestAccessStack.Screen name="SelectRole" component={SelectRole} />
    <RequestAccessStack.Screen
      name="RequestAccessComplete"
      component={RequestAccessComplete}
    />
    <RequestAccessStack.Screen name="RequestAccess" component={RequestAccess} />
  </RequestAccessStack.Navigator>
);

const OnboardingStack = createStackNavigator();
const OnboardingNavigator = () => (
  <OnboardingStack.Navigator>
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

const RootNavigation = () => {
  const {user} = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);
  const MainStack = createStackNavigator();
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={'SignIn'}
        screenOptions={{headerShown: false}}>
        <MainStack.Screen name="SignIn" component={SignIn} />
        <MainStack.Screen
          name="RequestAccess"
          component={RequestAccessNavigator}
        />
        <MainStack.Screen name="Onboarding" component={OnboardingNavigator} />
        <MainStack.Screen name="MyTabs" component={MyTabs} />
        <MainStack.Screen name="Chats" component={Chats} />
        <MainStack.Screen name="ChatDetails" component={ChatDetails} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
