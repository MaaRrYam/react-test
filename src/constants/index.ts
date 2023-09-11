import {Platform} from 'react-native';

export const COLORS = {
  primary: '#1918ff',
  text: '#5f5f5f',
  black: '#000',
  border: '#e7e7e7',
  white: '#fff',
  lightBackground: '#F4F4F4',
  lightBlueBackground: '#EDF0FF',
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
  },
  {
    id: 2,
    title: 'Recruiter',
    description:
      "If you're a recruiter, your profile would be personalized to aid you in identifying the suitable candidate for the job you're advertising.",
  },
  {
    id: 3,
    title: 'Helper',
    description:
      "If you're a helper, you'd provide your perspectives on the platform that are applicable to both recruiters and job seekers.",
  },
];

export const tempEducation = [
  {
    id: 1,
    instituteName: 'COMSATS University Lahore',
    degree: 'Bachelors in Computer Science',
    cgpa: '3.0',
    startingYear: 2018,
    endingYear: 2022,
  },
  {
    id: 2,
    instituteName: 'COMSATS University Lahore',
    degree: 'Bachelors in Computer Science',
    cgpa: '3.0',
    startingYear: 2018,
    currentlyWorking: true,
  },
];

export const industries = [
  'Engineering',
  'Information Technology',
  'Finance',
  'Marketing',
  'Sales',
  'Human Resources',
  'Legal',
  'Accounting',
  'Healthcare',
  'Retail & E-Commerce',
  'Education',
  'Media',
  'Logistics',
  'Consultant',
  'Other',
];

export const tempExperience = [
  {
    id: 1,
    currentCompany: 'CareerNetwork.co',
    designation: 'UI/UX Designer',
    startingYear: 2018,
    endingYear: 2019,
  },
  {
    id: 2,
    currentCompany: 'Microsoft',
    designation: 'Janitor',
    startingYear: 2018,
    currentlyWorking: true,
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
