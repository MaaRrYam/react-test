import SignupNavigator from './SignupNavigator';
import SigninNavigator from './SigninNavigator';
import RequestAccessNavigator from './RequestAccessNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import Drawer from '@/components/Drawer';
import {Main, Chats, ChatDetails, Article, Post} from '@/screens';
import {NavigationConfigProps} from '@/interfaces';
import {SCREEN_NAMES} from '@/constants';

const navigationConfig: NavigationConfigProps[] = [
  {name: SCREEN_NAMES.Launch, component: Main},
  {name: SCREEN_NAMES.Signin, component: SigninNavigator},
  {name: SCREEN_NAMES.Signup, component: SignupNavigator},
  {name: SCREEN_NAMES.RequestAccess, component: RequestAccessNavigator},
  {name: SCREEN_NAMES.Onboarding, component: OnboardingNavigator},
  {name: SCREEN_NAMES.BottomNavigator, component: Drawer},
  {name: SCREEN_NAMES.Chats, component: Chats},
  {name: SCREEN_NAMES.ChatDetails, component: ChatDetails},
  {name: SCREEN_NAMES.Article, component: Article},
  {name: SCREEN_NAMES.Post, component: Post},
];

export default navigationConfig;
