import {
  NavigationState,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {FeedItem, UserInterface} from '@/interfaces';
import {StackNavigationProp} from '@react-navigation/stack';
import {Dispatch, SetStateAction} from 'react';

export type RootStackParamList = {
  Signin: undefined;
  SelectRole: undefined;
  RequestAccess: {
    role: string;
  };
  RequestAccessComplete: undefined;
  GetStarted: undefined;
  Education: undefined;
  Industry: undefined;
  Experience: undefined;
  EmploymentStatus: undefined;
  SalaryExpectations: undefined;
  OnboardingCompleted: undefined;
  Home: undefined;
  Chats: undefined;
  Network: undefined;
  ChatDetails: {
    id: string;
    name: string;
    user: UserInterface;
  };
  Notifications: undefined;
  Jobs: undefined;
  Launch: undefined;
  SigninWithEmail: undefined;
  Signup: undefined;
  SignupWithEmail: undefined;
  Header: undefined;
  Profile: {
    uid: string;
    user?: UserInterface;
  };
  Article: {
    article?: FeedItem;
    id?: string;
  };
  Post: {
    id?: string;
    item?: FeedItem;
  };
};

export type LaunchScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Launch'>;
};

export type SelectRoleScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SelectRole'>;
};

export type RequestAccessScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'RequestAccess'>;
  route: RouteProp<RootStackParamList, 'RequestAccess'>;
};

export type RequestAccessCompleteScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'RequestAccessComplete'>;
};

export type GetStartedScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GetStarted'>;
};

export type EducationScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Education'>;
};

export type IndustryScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Industry'>;
};

export type ExperienceScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Experience'>;
};

export type EmploymentStatusScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'EmploymentStatus'>;
};

export type SalaryExpectationsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SalaryExpectations'>;
};

export type OnboardingCompletedScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'OnboardingCompleted'>;
};

export type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export type ChatsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Chats'>;
};

export type NetworkScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Network'>;
};

export type ChatDetailsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ChatDetails'>;
  route: RouteProp<RootStackParamList, 'ChatDetails'>;
};

export type ArticleScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Article'>;
  route: RouteProp<RootStackParamList, 'Article'>;
};

export type PostScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Post'>;
  route: RouteProp<RootStackParamList, 'Post'>;
};

export type NotificationsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Notifications'>;
};
export type JobsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Jobs'>;
};

export type SignInScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Signin'>;
};
export type SigninWithEmailProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SigninWithEmail'>;
};
export type SignupScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Signup'>;
};

export type SignupWithEmailProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignupWithEmail'>;
};

export type HeaderProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Header'> | any;
  setSearchText?: (text: string) => void;
  searchText?: string;
  setJobsFilterBottomSheet?: Function;
  setIsSettingsClicked: Dispatch<SetStateAction<boolean>>;
};
export type DateFormatOption = 'date' | 'dateTime' | 'time';
export type NavigationStateType = NavigationState<ParamListBase>;
