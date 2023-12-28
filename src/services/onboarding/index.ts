import {API_GET} from '@/config/api/apiRequests';
import {SCREEN_NAMES} from '@/constants';
import {
  Asset,
  EducationState,
  ExperienceState,
  UserInterface,
} from '@/interfaces';
import {getUID} from '@/utils/functions';
import FirebaseService from '@/services/Firebase';

const OnboardingService = {
  async getStarted(newData: UserInterface, profilePic: Asset) {
    const UID = (await getUID()) as string;
    if (profilePic) {
      const downloadURL = await FirebaseService.uploadToStorage(profilePic);
      const newDataObj = {
        ...newData,
        photoUrl: downloadURL,
      };

      FirebaseService.updateDocument('users', UID, newDataObj);
    } else {
      FirebaseService.updateDocument('users', UID, newData);
    }
  },
  setScreen(navigation, setIsLoading: Function, userData: UserInterface) {
    if (!userData?.onboarded) {
      if (userData?.onboardingStep === 0) {
        setIsLoading(false);
      } else if (userData?.onboardingStep === 1) {
        navigation.navigate(SCREEN_NAMES.Education);
      } else if (userData?.onboardingStep === 2) {
        navigation.navigate(SCREEN_NAMES.Industry);
      } else if (userData?.onboardingStep === 3) {
        navigation.navigate(SCREEN_NAMES.Experience);
      } else if (userData?.onboardingStep === 4) {
        navigation.navigate(SCREEN_NAMES.SalaryExpectations);
      }
    }
    setIsLoading(false);
  },
  async fetchUserData() {
    try {
      const UID = (await getUID()) as string;
      const data = await FirebaseService.getDocument('users', UID);
      if (data) {
        return data as UserInterface;
      }
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  },
  async education(education: EducationState) {
    const UID = (await getUID()) as string;
    FirebaseService.updateDocument('users', UID, {
      educationList: education,
      onboardingStep: 1,
    });
  },

  async industry(selectedIndustries: string[]) {
    const UID = (await getUID()) as string;

    await FirebaseService.updateDocument('users', UID, {
      jobTags: selectedIndustries,
      onboardingStep: 2,
    });
  },
  async experience(experience: ExperienceState) {
    const UID = (await getUID()) as string;

    await FirebaseService.updateDocument('users', UID, {
      employmentList: experience,
      onboardingStep: 3,
    });
  },
  async employmentStatus(employment: string) {
    const UID = (await getUID()) as string;

    FirebaseService.updateDocument('users', UID, {
      currentStatus: employment,
      onboardingStep: 4,
    });
  },
  async SalaryExpectation(newData: UserInterface) {
    const UID = (await getUID()) as string;

    FirebaseService.updateDocument('users', UID, newData);
  },

  async onboardingCompleted() {
    const UID = (await getUID()) as string;

    await FirebaseService.updateDocument('users', UID, {
      onboarded: true,
    });
    await API_GET('email/sendWelcomeEmail');
  },
};

export default OnboardingService;
