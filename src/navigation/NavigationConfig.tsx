import SignupNavigator from './SignupNavigator';
import SigninNavigator from './SigninNavigator';
import RequestAccessNavigator from './RequestAccessNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import MyTabs from '@/components/Drawer';
import {Main, Chats, ChatDetails} from '@/screens';
import {NavigationConfigProps} from '@/interfaces';

const navigationConfig: NavigationConfigProps[] = [
  {name: 'Main', component: Main},
  {name: 'Signin', component: SigninNavigator},
  {name: 'Signup', component: SignupNavigator},
  {name: 'RequestAccess', component: RequestAccessNavigator},
  {name: 'Onboarding', component: OnboardingNavigator},
  {name: 'MyTabs', component: MyTabs},
  {name: 'Chats', component: Chats},
  {name: 'ChatDetails', component: ChatDetails},
];

export default navigationConfig;
