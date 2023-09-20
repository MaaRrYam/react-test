import SignupNavigator from './SignupNavigator';
import SigninNavigator from './SigninNavigator';
import RequestAccessNavigator from './RequestAccessNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import MyTabs from '@/components/Drawer';
import {Main, Chats, ChatDetails} from '@/screens';
import {NavigationConfigProps} from '@/interfaces';
import {
  MainScreenName,
  SigninScreenName,
  SignupScreenName,
  RequestAccessScreenName,
  OnboardingScreenName,
  MyTabsScreenName,
  ChatsScreenName,
  ChatDetailsScreenName,
} from '@/utils/ScreenNames';
const navigationConfig: NavigationConfigProps[] = [
  {name: MainScreenName, component: Main},
  {name: SigninScreenName, component: SigninNavigator},
  {name: SignupScreenName, component: SignupNavigator},
  {name: RequestAccessScreenName, component: RequestAccessNavigator},
  {name: OnboardingScreenName, component: OnboardingNavigator},
  {name: MyTabsScreenName, component: MyTabs},
  {name: ChatsScreenName, component: Chats},
  {name: ChatDetailsScreenName, component: ChatDetails},
];

export default navigationConfig;
