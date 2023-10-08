import {getUID} from '@/utils/functions';
import FirebaseService from '../Firebase';

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
};

export default ProfileService;
