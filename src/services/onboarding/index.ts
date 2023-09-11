import {requestAccessFormValues} from '@/interfaces';
import FirebaseService from '@/services/Firebase';

export async function submitRequestAccess(
  requestDetails: requestAccessFormValues,
) {
  try {
    const isDuplicate = await FirebaseService.checkDuplicateRequest(
      'whitelist',
      'email',
      requestDetails.email,
    );
    if (isDuplicate) {
      return {success: false, message: 'You already have a pending request'};
    } else {
      await FirebaseService.addDocument('whitelist', {
        ...requestDetails,
        time: FirebaseService.serverTimestamp(),
        id: FirebaseService.generateUniqueId(),
        whitelisted: false,
      });
      return {success: true, message: 'Request Successfully Submitted!'};
    }
  } catch (error) {
    return {success: false, message: 'An Error Occurred'};
  }
}

export const RoleService = {
  async getJobRoles() {
    try {
      const constantsDoc = await FirebaseService.getDocument(
        'constants',
        'jobRoles',
      );
      const jobRoles: string[] = constantsDoc?.jobRoles || [];
      return jobRoles;
    } catch (error) {
      console.error('Error fetching job roles: ', error);
      throw error;
    }
  },
};
