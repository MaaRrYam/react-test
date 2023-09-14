import {Platform} from 'react-native';

export const COLORS = {
  primary: '#1918ff',
  text: '#5f5f5f',
  black: '#000',
  border: '#e7e7e7',
  white: '#fff',
  lightBackground: '#F4F4F4',
  lightBlueBackground: '#EDF0FF',
  lightGrayBackground: '#F4F4F4',
};

export const BORDER_RADIUS = {
  general: 8,
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
