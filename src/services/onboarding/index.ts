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
      });
      return {success: true, message: 'Request Successfully Submitted!'};
    }
  } catch (error) {
    return {success: false, message: 'An Error Occurred'};
  }
}
