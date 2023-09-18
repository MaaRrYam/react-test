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
  Main,
  SigninScreen,
} from '@/screens';
import MyTabs from '@/components/Drawer';
import {useEffect} from 'react';
// import SigninScreen from '@/screens/signin/SigninScreen';

const SigninStack = createStackNavigator();
const SigninNavigator = () => (
  <SigninStack.Navigator screenOptions={{headerShown: false}}>
    <SigninStack.Screen name="SigninOptionsScreen" component={SigninScreen} />
  </SigninStack.Navigator>
);

const RequestAccessStack = createStackNavigator();
const RequestAccessNavigator = () => (
  <RequestAccessStack.Navigator screenOptions={{headerShown: false}}>
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

const RootNavigation = () => {
  const {user} = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);
  const MainStack = createStackNavigator();
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={'Main'}
        screenOptions={{headerShown: false}}>
        <MainStack.Screen name="Main" component={Main} />
        <MainStack.Screen name="Signin" component={SigninNavigator} />
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
