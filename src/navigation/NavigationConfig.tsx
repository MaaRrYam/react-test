import SignupNavigator from './SignupNavigator';
import SigninNavigator from './SigninNavigator';
import RequestAccessNavigator from './RequestAccessNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import MyTabs from '@/components/Drawer';
import {Main, Chats, ChatDetails} from '@/screens';
import {NavigationConfigProps} from '@/interfaces';
import {SCREEN_NAMES} from '@/constants';

const navigationConfig: NavigationConfigProps[] = [
  {name: SCREEN_NAMES.Main, component: Main},
  {name: SCREEN_NAMES.Signin, component: SigninNavigator},
  {name: SCREEN_NAMES.Signup, component: SignupNavigator},
  {name: SCREEN_NAMES.RequestAccess, component: RequestAccessNavigator},
  {name: SCREEN_NAMES.Onboarding, component: OnboardingNavigator},
  {name: SCREEN_NAMES.MyTabs, component: MyTabs},
  {name: SCREEN_NAMES.Chats, component: Chats},
  {name: SCREEN_NAMES.ChatDetails, component: ChatDetails},
];

export default navigationConfig;
