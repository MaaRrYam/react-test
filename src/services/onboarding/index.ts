import {API_GET} from '@/config/api/apiRequests';
import {SCREEN_NAMES} from '@/constants';
import {
  EducationState,
  EmploymentProps,
  ExperienceState,
  SalaryExpectation,
  UserInterface,
} from '@/interfaces';
import {setLoadingFinished} from '@/store/features/loadingSlice';
import {SalaryExpectationsScreenProps} from '@/types';
import {getUID} from '@/utils/functions';
import {Dispatch} from '@reduxjs/toolkit';
import FirebaseService from '../Firebase';

let UID: string;
(async () => {
  UID = await getUID();
})();
type AppDispatch = Dispatch;

const OnboardingService = {
  async getStarted(newData: UserInterface) {
    FirebaseService.updateDocument('users', UID, newData);
  },
  setScreen(navigation, dispatch: AppDispatch, userData: UserInterface) {
    if (userData?.onboardingStep === 0 || userData?.onboarded === false) {
      dispatch(setLoadingFinished());
    } else if (userData?.onboardingStep === 1) {
      dispatch(setLoadingFinished());
      navigation.navigate(SCREEN_NAMES.Education);
    } else if (userData?.onboardingStep === 2) {
      dispatch(setLoadingFinished());
      navigation.navigate(SCREEN_NAMES.Industry);
    } else if (userData?.onboardingStep === 3) {
      dispatch(setLoadingFinished());
      navigation.navigate(SCREEN_NAMES.Experience);
    } else if (userData?.onboardingStep === 4) {
      dispatch(setLoadingFinished());
      navigation.navigate(SCREEN_NAMES.EmploymentStatus);
    }
  },
  async fetchUserData() {
    try {
      const data = await FirebaseService.getDocument('users', UID);
      if (data) {
        return data as UserInterface;
      }
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  },
  async education(education: EducationState) {
    FirebaseService.updateDocument('users', UID, {
      educationList: education,
      onboardingStep: 1,
    });
  },

  async industry(selectedIndustries: string[]) {
    await FirebaseService.updateDocument('users', UID, {
      jobTags: selectedIndustries,
      onboardingStep: 2,
    });
  },
  async experience(experience: ExperienceState) {
    await FirebaseService.updateDocument('users', UID, {
      employmentList: experience,
      onboardingStep: 3,
    });
  },
  async employmentStatus(employment: EmploymentProps) {
    FirebaseService.updateDocument('users', UID, {
      currentStatus: employment,
      onboardingStep: 4,
    });
  },
  async SalaryExpectation(newData: UserInterface) {
    FirebaseService.updateDocument('users', UID, newData);
  },

  async onboardingCompleted() {
    await FirebaseService.updateDocument('users', UID, {
      onboarded: true,
    });
    await API_GET(`email/sendWelcomeEmail`);
  },
};

export default OnboardingService;
