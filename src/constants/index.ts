import {Platform} from 'react-native';
import {getScreenDimensions} from '@/utils/functions';

export const baseURL: string =
  process.env.REACT_APP_API_BASE_URL ||
  'https://career-network-firebase-dev.herokuapp.com/api';
export const isInDevelopment: boolean = process.env.NODE_ENV !== 'production';
export const UNAUTHORIZED = 401;
export const UNAUTHENTICATED = 403;

export const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
export const getUserCacheKey = (uid: string): string => `user_${uid}`;
export const getFeedCacheKey = (): string => 'feed';

export const COLORS = {
  primary: '#1918ff',
  text: '#5f5f5f',
  black: '#000',
  border: '#e7e7e7',
  white: '#fff',
  lightBackground: '#F4F4F4',
  lightBlueBackground: '#EDF0FF',
  lightGrayBackground: '#F4F4F4',
  deleteButtonBackground: 'rgba(255, 24, 24, 0.06)',
};

export const BORDER_RADIUS = {
  general: 5,
  recruiterIcon: 20,
};
export const BORDER_WIDTH = {
  general: 2,
  thin: 1,
};

export const FONTS = {
  text: 16,
  heading: 32,
  smallLabel: 12,
  regularLabel: 14,
  largeLabel: 16,
  bodySmall: 12,
  bodyRegular: 14,
  title: 32,
};

export const MARGINS = {
  general: 20,
};

export const PADDING = {
  general: Platform.OS === 'ios' ? 20 : 12,
  card: 17,
};

export const ICON_WIDTH = {
  general: 50,
};
export const ICON_HEIGHT = {
  general: 50,
};

export const ROLES_DATA = [
  {
    id: 1,
    title: 'Job Seeker',
    description:
      "Your profile's content would be tailored to assist you in finding a job, given that you are actively looking for opportunities.",
    value: 'Seeker',
  },
  {
    id: 2,
    title: 'Recruiter',
    description:
      "If you're a recruiter, your profile would be personalized to aid you in identifying the suitable candidate for the job you're advertising.",
    value: 'Recruiter',
  },
  {
    id: 3,
    title: 'Helper',
    description:
      "If you're a helper, you'd provide your perspectives on the platform that are applicable to both recruiters and job seekers.",
    value: 'Helper',
  },
];

export const employmentStatuses = [
  'Full Time',
  'Part Time',
  'Internship',
  'Contract',
  'Temporary',
  'UnEmployed',
];

export const NETWORK_TABS = ['Explore', 'Connections', 'Following'];
export const JOBS_TABS = ['Jobs', 'Past Applications', 'Saved'];

export const PROFILE_TABS = ['Profile', 'Career', 'Education'];

export const NETWORK_REQUESTS = [
  {
    id: 1,
    name: 'Abdullah Sarfraz',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    tagline: 'Full Stack Developer',
  },
  {
    id: 2,
    name: 'Abdullah Akhtar',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    tagline: 'Full Stack Developer',
  },
  {
    id: 3,
    name: 'Definitely Someone',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    tagline: 'Full Stack Developer',
  },
];

export const CHAT_DETAILS = [
  {
    id: 1,
    date: 'Thursday 24, July',
    messages: [
      {
        message: "Hi Dad, I'm help",
        sender: 'someone',
        time: '10:00',
      },
      {
        message: 'Can you respond?',
        sender: 'someone',
        time: '10:00',
      },

      {
        message: "Hi Help, I'm Dad",
        sender: 'me',
        time: '10:00',
      },

      {
        message: 'Hi, how are you?',
        sender: 'me',
        time: '10:00',
      },
    ],
  },
  {
    id: 2,
    date: 'Thursday 31, July',
    messages: [
      {
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        sender: 'someone',
        time: '10:00',
      },
      {
        message:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        sender: 'me',
        time: '10:00',
      },
    ],
  },
];

export const NOTIFICATIONS = [
  {
    id: 1,
    description: 'Abdullah Akhtar wants to connect with you',
    isConnectionRequest: true,
    date: 'Thursday 24, July',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    isUnRead: true,
  },
  {
    id: 2,
    description: 'You have a new message from Abdullah',
    date: 'Thursday 24, July',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    isUnRead: true,
  },
  {
    id: 3,
    description: 'You have a new message from Abdullah',
    date: 'Thursday 24, July',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    isUnRead: false,
  },
  {
    id: 4,
    description: 'You have a new message from Abdullah',
    date: 'Thursday 24, July',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    isUnRead: false,
  },
];
const {width} = getScreenDimensions();
export const containerWidth = width - 50;

export const SCREEN_NAMES = {
  Launch: 'Launch',
  Signin: 'Signin',
  Signup: 'Signup',
  RequestAccess: 'RequestAccess',
  Onboarding: 'Onboarding',
  BottomNavigator: 'BottomNavigator',
  Chats: 'Chats',
  ChatDetails: 'ChatDetails',
  GetStarted: 'GetStarted',
  Education: 'Education',
  Industry: 'Industry',
  Experience: 'Experience',
  SalaryExpectations: 'SalaryExpectations',
  EmploymentStatus: 'EmploymentStatus',
  OnboardingCompleted: 'OnboardingCompleted',
  SelectRole: 'SelectRole',
  RequestAccessForm: 'RequestAccessForm',
  RequestAccessComplete: 'RequestAccessComplete',
  SigninOptions: 'SigninOptions',
  SigninWithEmail: 'SigninWithEmail',
  SignupWithEmail: 'SignupWithEmail',
  Home: 'Home',
  Network: 'Network',
  Notifications: 'Notifications',
  Jobs: 'Jobs',
  Profile: 'Profile',
  Article: 'Article',
  Post: 'Post',
};

export const jobTypes = ['Full-time', 'Part-time', 'Temporary', 'Intern'];
export const workEnviroment = ['In-office', 'Remote', 'Hybrid'];
export const SETTINGS_TABS = ['Basic Info', 'Account Preferences', 'Feedback'];
export const feedbackCategories = [
  "Something isn't working",
  'This feature already exists somewhere',
  'New Feature Request',
  'Good for newcomers',
  "This doesn't seem right",
  'Any query regarding the platform',
];
