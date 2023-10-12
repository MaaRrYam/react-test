import {areCareersEqual, areEducationsEqual, getUID} from '@/utils/functions';
import FirebaseService from '@/services/Firebase';
import {EmploymentProps, EducationProps, FeedItem} from '@/interfaces';
import {Timestamp} from 'firebase/firestore';
import ToastService from '@/services/toast';
import {API_GET} from '@/config/api/apiRequests';
const ProfileService = {
  async handleSaveBasicInformation(
    formValues: {
      name: string;
      about: string;
      tagline: string;
      country: string;
      state: string;
      city: string;
    },
    setSubmitting: (value: boolean) => void,
  ) {
    await setSubmitting(true);
    const uid = await getUID();
    await FirebaseService.updateDocument('users', uid as string, {
      name: formValues.name,
      description: formValues.about,
      tagline: formValues.tagline,
      country: formValues.country,
      state: formValues.state,
      city: formValues.city,
    });
    await setSubmitting(false);
  },
  async handleCareerInfoEdit(
    values: {
      companyName: string;
      role: string;
      startYear: string;
      isCurrentlyWorking: boolean;
      endYear: string;
    },
    setSubmitting: (value: boolean) => void,
    setEditingIndex: (value: number | null) => void,
    editingIndex: number | null,
    careerList: EmploymentProps[],
  ) {
    await setSubmitting(true);
    console.log('Form submitted with values:', values);
    const uid = await getUID();
    const newEmployment: EmploymentProps = {
      companyName: values.companyName,
      role: values.role,
      startYear: values.startYear,
      endYear: values.isCurrentlyWorking
        ? new Date().getFullYear().toString()
        : values.endYear,
      currentlyWorking: values.isCurrentlyWorking,
      id: FirebaseService.generateUniqueId(),
    };

    if (editingIndex !== null) {
      const updatedExperience = [...careerList];
      updatedExperience[editingIndex] = newEmployment;
      setEditingIndex(null);

      await FirebaseService.updateDocument('users', uid as string, {
        employmentList: updatedExperience,
      });
    } else {
      const isDuplicate = careerList.some(career =>
        areCareersEqual(career, newEmployment),
      );
      if (!isDuplicate) {
        await FirebaseService.updateDocument('users', uid as string, {
          employmentList: [...careerList, newEmployment],
        });
      }
    }
    await setSubmitting(false);
  },
  async deleteCareer(indexToRemove: number, careerList: EmploymentProps[]) {
    const updatedCareerList = [...careerList];
    updatedCareerList.splice(indexToRemove, 1);
    const uid = await getUID();
    if (uid) {
      FirebaseService.updateDocument('users', uid as string, {
        employmentList: updatedCareerList,
      });
    }
  },
  toggleCareerEditForm(
    setIsEditing: (value: boolean) => void,
    setAddNew: (value: boolean) => void,
    isEditing: boolean,
    resetForm: Function,
  ) {
    setIsEditing(!isEditing);
    setAddNew(false);
    resetForm();
  },
  async editCareer(
    setIsEditing: (value: boolean) => void,
    setAddNew: (value: boolean) => void,
    isEditing: boolean,
    resetForm: Function,
    setEditingIndex: (value: number | null) => void,
    index: number,
  ) {
    await this.toggleCareerEditForm(
      setIsEditing,
      setAddNew,
      isEditing,
      resetForm,
    );
    await setEditingIndex(index);
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
    await ToastService.showSuccess('You are now Following this user');
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
};

export default ProfileService;
