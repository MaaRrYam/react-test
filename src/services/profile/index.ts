import {areEducationsEqual, getUID} from '@/utils/functions';
import FirebaseService from '@/services/Firebase';
import {
  EmploymentProps,
  EducationProps,
  FeedItem,
  UserInterface,
  FeedbackInterface,
  SettingBasicInfoUpdateInterface,
} from '@/interfaces';
import {Timestamp} from 'firebase/firestore';
import ToastService from '@/services/toast';
import {API_GET} from '@/config/api/apiRequests';
import Cache from '@/cache';
const ProfileService = {
  async handleSaveBasicInformation({
    name,
    about,
    tagline,
    country,
    state,
    city,
  }: {
    name: string;
    about: string;
    tagline: string;
    country: string;
    state: string;
    city: string;
  }) {
    const uid = await getUID();
    await FirebaseService.updateDocument('users', uid as string, {
      name,
      description: about,
      tagline,
      country,
      state,
      city,
    });
  },
  async updateEmployment(updatedCareerList: EmploymentProps[]) {
    try {
      const uid = (await getUID()) as string;
      FirebaseService.updateDocument('users', uid as string, {
        employmentList: updatedCareerList,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async updateEducation(updatedEducationList: EducationProps[]) {
    try {
      const uid = (await getUID()) as string;
      FirebaseService.updateDocument('users', uid as string, {
        educationList: updatedEducationList,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  toggleEducationEditForm(
    setIsEditing: (value: boolean) => void,
    setAddNew: (value: boolean) => void,
    isEditing: boolean,
  ) {
    setIsEditing(!isEditing);
    setAddNew(false);
  },
  async editEducation(
    setIsEditing: (value: boolean) => void,
    setAddNew: (value: boolean) => void,
    isEditing: boolean,
    setEditingIndex: (value: number | null) => void,
    index: number,
  ) {
    await this.toggleEducationEditForm(setIsEditing, setAddNew, isEditing);
    await setEditingIndex(index);
  },
  async handleEducationEdit(
    values: {
      instituteName: string;
      degreeName: string;
      startYear: string;
      endYear: string;
      isCurrentlyStudying: boolean;
    },
    setSubmitting: (value: boolean) => void,
    editingIndex: number | null,
    educationList: EducationProps[],
    setEditingIndex: (value: number | null) => void,
    setAddNew: (value: boolean) => void,
    setIsEditing: (value: boolean) => void,
    isEditing: boolean,
  ) {
    await setSubmitting(true);
    console.log('Form submitted with values:', values);
    const uid = await getUID();

    const newEducation: EducationProps = {
      instituteName: values.instituteName,
      degree: values.degreeName,
      startYear: values.startYear,
      endYear: values.isCurrentlyStudying ? 'Present' : values.endYear,
      currentlyStudying: values.isCurrentlyStudying,
      id: FirebaseService.generateUniqueId(),
    };
    if (editingIndex !== null) {
      const updatedEducation = [...educationList];
      updatedEducation[editingIndex] = newEducation;
      await FirebaseService.updateDocument('users', uid as string, {
        educationList: updatedEducation,
      });
      setEditingIndex(null);
      this.toggleEducationEditForm(setIsEditing, setAddNew, isEditing);
    } else {
      const isDuplicate = educationList.some(education =>
        areEducationsEqual(education, newEducation),
      );

      if (!isDuplicate) {
        await FirebaseService.updateDocument('users', uid as string, {
          educationList: [...educationList, newEducation],
        });
        await setSubmitting(false);
        this.toggleEducationEditForm(setIsEditing, setAddNew, isEditing);
      }
    }
  },

  async deleteEducation(
    indexToDelete: number,
    educationList: EducationProps[],
  ) {
    const uid = await getUID();
    const updatedEducationList = [...educationList];
    updatedEducationList.splice(indexToDelete, 1);
    await FirebaseService.updateDocument('users', uid as string, {
      educationList: updatedEducationList,
    });
  },

  async connect(userId: string, loggedinUserUID: string) {
    try {
      await FirebaseService.addDocument(`users/${userId}/requests`, {
        id: loggedinUserUID,
        time: FirebaseService.serverTimestamp(),
      });
      await this.follow(userId, loggedinUserUID);
      await ToastService.showSuccess('Connection Request Sent');
      await ToastService.showSuccess('You are now Following this user');
    } catch (error) {
      console.log(error);
    }
  },
  async acceptRequest(userId: string, loggedInUserId: string) {
    try {
      await FirebaseService.setDoc(
        `users/${userId}/connections`,
        loggedInUserId,
        {
          id: loggedInUserId,
          time: Timestamp.now(),
        },
      );
      await FirebaseService.setDoc(
        `users/${loggedInUserId}/connections`,
        userId,
        {
          id: userId,
          time: Timestamp.now(),
        },
      );
      await FirebaseService.deleteDocument(
        `users/${loggedInUserId}/requests`,
        userId,
      );
      await FirebaseService.deleteDocument(
        `users/${userId}/pendingRequests`,
        loggedInUserId,
      );
    } catch (error) {
      console.error('Error accepting connection:', error);
      return false;
    }
  },
  async follow(userId: string, loggedInUserId: string) {
    await FirebaseService.addDocument(`users/${userId}/followers`, {
      id: loggedInUserId,
      time: Timestamp.now(),
    });

    await FirebaseService.addDocument(`users/${loggedInUserId}/followering`, {
      id: userId,
      time: Timestamp.now(),
    });
    ToastService.showSuccess('You are now Following this user');
  },
  async getFeed(uid: string) {
    try {
      const {status, message, data} = await API_GET(`/feed/profile/${uid}`);
      if (status) {
        return data as FeedItem[];
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error('Error fetching followers:', error);
      throw error;
    }
  },
  async getUsersProfile(id: string) {
    try {
      const user = (await FirebaseService.getDocument(
        'users',
        id,
      )) as UserInterface;

      Cache.set(`user_${id}`, user);

      return user;
    } catch (error) {
      console.error('Error fetching followers:', error);
      throw error;
    }
  },
  async createFeedback(payload: FeedbackInterface) {
    try {
      await FirebaseService.setDoc('feedback', payload.id, payload);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async updateSettingsBasicInfo(payload: SettingBasicInfoUpdateInterface) {
    try {
      await FirebaseService.updateDocument('users', payload.id, payload);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default ProfileService;
